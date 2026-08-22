import { screen, waitFor } from '@testing-library/vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { toast } from '../../src';

function promiseTick(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, delay);
  });
}

describe('toast.update', () => {
  beforeEach(async () => {
    toast.clearAll(undefined, false);
    await promiseTick();
  });

  afterEach(async () => {
    toast.clearAll(undefined, false);
    await promiseTick();
  });

  it('updates the content of a displayed toast', async () => {
    const id = toast('Hello', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toHaveTextContent('Hello');

    toast.update(id, { render: 'Updated!' });
    const updated = await screen.findByText('Updated!');

    // update replaces the node: exactly one item with this id must remain
    expect(screen.getAllByTestId(`toast-item-${id}`)).toHaveLength(1);
    expect(updated.closest('.Toastify__toast')).not.toBeNull();
  });

  it('updates options like type and theme', async () => {
    const id = toast('Hello', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).not.toHaveClass('Toastify__toast--success');

    toast.update(id, {
      render: 'Saved',
      type: 'success',
      theme: 'dark',
    });

    const updatedRoot = (await screen.findByText('Saved')).closest('.Toastify__toast') as HTMLElement;

    expect(updatedRoot).toHaveClass('Toastify__toast--success');
    expect(updatedRoot).toHaveClass('Toastify__toast-theme--dark');
    expect(screen.queryByTestId('toast-icon-default')).toBeNull();
    expect(screen.getByTestId('toast-icon-success')).toBeInTheDocument();
  });

  it('keeps unspecified options untouched', async () => {
    const id = toast('Hello', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);
    const progressBar = target.querySelector('.Toastify__progress-bar') as HTMLElement;

    // opacity 0 means autoClose === false (ProgressBar style: hide || autoClose === false ? 0 : 1)
    expect(progressBar.style.opacity).toBe('0');

    toast.update(id, { render: 'Updated!' });

    // wait for the update itself to land before checking the preserved option
    const updated = await screen.findByText('Updated!');
    const updatedBar = updated.closest('.Toastify__toast')?.querySelector('.Toastify__progress-bar') as HTMLElement;

    expect(updatedBar.style.opacity).toBe('0');
  });

  it('leaves existing toasts untouched when the id does not exist', async () => {
    const id = toast('Hello', { autoClose: false });

    await screen.findByTestId(`toast-item-${id}`);

    toast.update('ghost-toast', { render: 'boo' });

    // negative case: nothing new will appear, so settle once and check nothing changed
    await promiseTick(50);

    expect(screen.queryByText('boo')).toBeNull();
    expect(screen.getAllByTestId(`toast-item-${id}`)).toHaveLength(1);
    expect(screen.getByTestId(`toast-item-${id}`)).toHaveTextContent('Hello');
  });

  it('turns a loading toast into its final state via toast.done', async () => {
    const id = toast.loading('working', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target.querySelector('.Toastify__spinner')).not.toBeNull();

    toast.done(id);

    // done recreates the node: poll until the controlled progress bar reports progress 1
    const doneToast = await waitFor(() => {
      const node = screen.getByTestId(`toast-item-${id}`);
      const bar = node.querySelector('.Toastify__progress-bar') as HTMLElement;

      expect(bar.style.transform).toBe('scaleX(1)');

      return node;
    });

    expect(doneToast.querySelector('.Toastify__spinner')).toBeNull();
    expect(doneToast).toHaveTextContent('working');
  });

  it('keeps a middle-of-stack toast in place when updated', async () => {
    const first = toast('First', {
      toastId: 'pos-first',
      autoClose: false,
    });
    const second = toast('Second', {
      toastId: 'pos-second',
      autoClose: false,
    });
    const third = toast('Third', {
      toastId: 'pos-third',
      autoClose: false,
    });

    await screen.findByTestId(`toast-item-${first}`);
    await screen.findByTestId(`toast-item-${second}`);
    await screen.findByTestId(`toast-item-${third}`);

    expect(domOrder()).toEqual(['toast-item-pos-first', 'toast-item-pos-second', 'toast-item-pos-third']);

    toast.update(second, { render: 'Second (updated)' });

    await screen.findByText('Second (updated)');

    // issue #77: the update must not push the toast to the end of the stack
    expect(domOrder()).toEqual(['toast-item-pos-first', 'toast-item-pos-second', 'toast-item-pos-third']);
  });

  it('keeps the promise pending toast slot on success', async () => {
    let resolvePromise: (value: string) => void;

    const promise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });

    toast.promise(promise, {
      pending: 'Saving...',
      success: 'Saved!',
      error: 'Failed!',
    }, { toastId: 'promise-pos-target' });

    const first = toast('First', {
      toastId: 'promise-pos-first',
      autoClose: false,
    });
    const second = toast('Second', {
      toastId: 'promise-pos-second',
      autoClose: false,
    });

    await screen.findByText('Saving...');
    await screen.findByTestId(`toast-item-${first}`);
    await screen.findByTestId(`toast-item-${second}`);

    expect(domOrder()).toEqual([
      'toast-item-promise-pos-target',
      'toast-item-promise-pos-first',
      'toast-item-promise-pos-second',
    ]);

    resolvePromise!('ok');
    await promise;

    await screen.findByText('Saved!');

    expect(domOrder()).toEqual([
      'toast-item-promise-pos-target',
      'toast-item-promise-pos-first',
      'toast-item-promise-pos-second',
    ]);
  });
});

function domOrder() {
  return [...document.querySelectorAll('[data-testid^="toast-item-"]')].map((n) => n.getAttribute('data-testid'));
}
