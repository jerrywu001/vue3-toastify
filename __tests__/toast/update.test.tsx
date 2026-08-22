import { screen } from '@testing-library/vue';
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
    await promiseTick(50);

    expect(screen.getAllByTestId(`toast-item-${id}`)).toHaveLength(1);
    expect(screen.getByTestId('toast-content')).toHaveTextContent('Updated!');
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
    await promiseTick(50);

    const updated = screen.getByTestId(`toast-item-${id}`);

    expect(updated).toBeInTheDocument();
    expect(updated).toHaveClass('Toastify__toast--success');
    expect(updated).toHaveClass('Toastify__toast-theme--dark');
    expect(screen.queryByTestId('toast-icon-default')).toBeNull();
    expect(screen.getByTestId('toast-icon-success')).toBeInTheDocument();
  });

  it('keeps unspecified options untouched', async () => {
    const id = toast('Hello', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);
    const progressBar = target.querySelector('.Toastify__progress-bar') as HTMLElement;

    expect(progressBar.style.opacity).toBe('0');

    toast.update(id, { render: 'Updated!' });
    await promiseTick(50);

    const updatedBar = screen.getByTestId(`toast-item-${id}`).querySelector('.Toastify__progress-bar') as HTMLElement;

    expect(updatedBar.style.opacity).toBe('0');
  });

  it('does nothing when the toast does not exist', async () => {
    toast.update('ghost-toast', { render: 'boo' });
    await promiseTick(50);

    expect(screen.queryByTestId('toast-content')).toBeNull();
  });

  it('turns a loading toast into its final state via toast.done', async () => {
    const id = toast.loading('working', { autoClose: false });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target.querySelector('.Toastify__spinner')).not.toBeNull();

    toast.done(id);
    await promiseTick(50);

    const doneToast = screen.getByTestId(`toast-item-${id}`);
    const progressBar = doneToast.querySelector('.Toastify__progress-bar') as HTMLElement;

    expect(doneToast.querySelector('.Toastify__spinner')).toBeNull();
    expect(doneToast).toHaveTextContent('working');
    expect(progressBar.style.transform).toBe('scaleX(1)');
  });
});
