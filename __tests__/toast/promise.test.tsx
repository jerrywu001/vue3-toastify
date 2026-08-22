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
    await promiseTick(400);

    const successToast = screen.getByText('saved!').closest('.Toastify__toast');

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
    await promiseTick(400);

    const errorToast = screen.getByText('failed!').closest('.Toastify__toast');

    expect(errorToast).toHaveClass('Toastify__toast--error');
  });

  it('skips the pending state when no pending option is given', async () => {
    const result = toast.promise(Promise.resolve('v'), { success: 'done!' });

    await expect(result).resolves.toBe('v');
    await promiseTick(400);

    expect(screen.getByText('done!')).toBeInTheDocument();
  });
});
