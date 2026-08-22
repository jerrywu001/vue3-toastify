import { screen } from '@testing-library/vue';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { queue, toast, updateGlobalOptions } from '../src';

function promiseTick(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, delay);
  });
}

const progressBarOf = (target: HTMLElement) => target.querySelector('.Toastify__progress-bar');

describe('resetOnDuplicate', () => {
  beforeEach(async () => {
    toast.clearAll(undefined, false);
    queue.items.length = 0;
    await promiseTick();
  });

  afterEach(async () => {
    toast.clearAll(undefined, false);
    queue.items.length = 0;
    updateGlobalOptions({});
    await promiseTick();
  });

  it('should reset and animate an opted-in duplicate toast', async () => {
    const toastId = 'duplicate';

    toast('Hello', {
      toastId,
      resetOnDuplicate: true,
    });
    const target = await screen.findByTestId(`toast-item-${toastId}`);
    const firstProgressBar = progressBarOf(target);

    toast('Hello again', {
      toastId,
      resetOnDuplicate: true,
    });
    await promiseTick();

    const nextProgressBar = progressBarOf(target);

    expect(screen.getAllByTestId(`toast-item-${toastId}`)).toHaveLength(1);
    expect(target).toHaveClass('Toastify__toast--duplicate');
    expect(nextProgressBar).not.toBe(firstProgressBar);
    expect(target.querySelector('[data-testid="toast-content"]')).toHaveTextContent('Hello');

    toast('Hello a third time', {
      toastId,
      resetOnDuplicate: true,
    });
    await promiseTick();

    expect(target).toHaveClass('Toastify__toast--duplicate');
    expect(progressBarOf(target)).not.toBe(nextProgressBar);
  });

  it('should not reset a duplicate toast by default', async () => {
    const toastId = 'duplicate-default';

    toast('Hello', { toastId });
    const target = await screen.findByTestId(`toast-item-${toastId}`);
    const firstProgressBar = progressBarOf(target);

    toast('Hello again', { toastId });
    await promiseTick();

    expect(target).not.toHaveClass('Toastify__toast--duplicate');
    expect(progressBarOf(target)).toBe(firstProgressBar);
  });

  it('should fall back to the option of the toast being displayed', async () => {
    const toastId = 'duplicate-fallback';

    toast('Hello', {
      toastId,
      resetOnDuplicate: true, 
    });
    const target = await screen.findByTestId(`toast-item-${toastId}`);
    const firstProgressBar = progressBarOf(target);

    // the option is not repeated on this call
    toast('Hello again', { toastId });
    await promiseTick();

    expect(progressBarOf(target)).not.toBe(firstProgressBar);
  });

  it('should reset a duplicate declared through the global options', async () => {
    const toastId = 'duplicate-global';

    updateGlobalOptions({ resetOnDuplicate: true });

    toast('Hello', { toastId });
    const target = await screen.findByTestId(`toast-item-${toastId}`);
    const firstProgressBar = progressBarOf(target);

    toast('Hello again', { toastId });
    await promiseTick();

    expect(progressBarOf(target)).not.toBe(firstProgressBar);
  });

  it('should reset a duplicate instead of queueing it when the limit is reached', async () => {
    const toastId = 'duplicate-limit';

    updateGlobalOptions({
      limit: 1,
      resetOnDuplicate: true,
    });

    toast('Hello', { toastId });
    const target = await screen.findByTestId(`toast-item-${toastId}`);
    const firstProgressBar = progressBarOf(target);

    toast('Hello again', { toastId });
    await promiseTick();

    expect(queue.items).toHaveLength(0);
    expect(screen.getAllByTestId(`toast-item-${toastId}`)).toHaveLength(1);
    expect(progressBarOf(target)).not.toBe(firstProgressBar);
  });
});
