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

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;

  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
}

describe('toast.promise', () => {
  beforeEach(async () => {
    toast.clearAll(undefined, false);
    await promiseTick();
  });

  afterEach(async () => {
    toast.clearAll(undefined, false);
    await promiseTick();
  });

  it('shows the pending state then the success state', async () => {
    const { promise, resolve } = deferred<string>();
    const result = toast.promise(promise, {
      pending: 'saving...',
      success: { render: 'saved!' },
      error: 'failed!',
    });

    const target = await screen.findByText('saving...');
    const pendingToast = target.closest('.Toastify__toast');

    expect(pendingToast?.querySelector('.Toastify__spinner')).not.toBeNull();

    resolve('ok');
    await expect(result).resolves.toBe('ok');

    // findByText retries through the update pipeline (setTimeout + nextTick + delay hops)
    const successToast = (await screen.findByText('saved!')).closest('.Toastify__toast');

    expect(successToast).toHaveClass('Toastify__toast--success');
    expect(successToast?.querySelector('.Toastify__spinner')).toBeNull();
  });

  it('shows the error state when the promise rejects', async () => {
    const { promise, reject } = deferred<never>();

    toast.promise(promise, {
      pending: 'saving...',
      success: 'saved!',
      error: 'failed!',
    });

    await screen.findByText('saving...');

    reject(new Error('boom'));
    await expect(promise).rejects.toThrow('boom');

    const errorToast = (await screen.findByText('failed!')).closest('.Toastify__toast');

    expect(errorToast).toHaveClass('Toastify__toast--error');
  });

  it('skips the pending state when no pending option is given', async () => {
    const result = toast.promise(Promise.resolve('v'), { success: 'done!' });

    // nothing may render while waiting
    expect(screen.queryByTestId('toast-content')).toBeNull();

    await expect(result).resolves.toBe('v');

    expect(await screen.findByText('done!')).toBeInTheDocument();
    // and no loading phase ever mounted
    expect(document.querySelector('.Toastify__spinner')).toBeNull();
  });

  it('accepts a function returning the promise', async () => {
    const result = toast.promise(() => Promise.resolve('lazy'), { success: 'ready!' });

    await expect(result).resolves.toBe('lazy');
    expect(await screen.findByText('ready!')).toBeInTheDocument();
  });

  it('passes the settled value to a function renderer', async () => {
    const result = toast.promise(Promise.resolve('payload'), { success: { render: ({ data }) => `got ${data}` } });

    await expect(result).resolves.toBe('payload');
    expect(await screen.findByText('got payload')).toBeInTheDocument();
  });

  it('dismisses the pending toast when no success or error content is given', async () => {
    const { promise, resolve } = deferred<string>();

    toast.promise(promise, { pending: 'waiting...' });
    const target = await screen.findByText('waiting...');
    const pendingToast = target.closest('.Toastify__toast') as HTMLElement;

    resolve('ok');
    await expect(promise).resolves.toBe('ok');

    // jsdom never fires animationend, so completion of the removal can't be observed;
    // assert that the exit transition started instead of the toast hanging around
    await waitFor(() => {
      expect(pendingToast.className).toContain('-exit');
    });
  });
});
