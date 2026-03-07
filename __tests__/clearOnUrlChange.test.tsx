import { screen } from '@testing-library/vue';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { toast, ToastActions, updateGlobalOptions } from '../src';

function promiseTick(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, delay);
  });
}

function waitForPopState(timeout = 1000) {
  return new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('wait popstate timeout'));
    }, timeout);

    window.addEventListener('popstate', () => {
      clearTimeout(timer);
      resolve();
    }, { once: true });
  });
}

async function navigateBack() {
  const pathname = window.location.pathname;
  const randomPath = `/issue-89-${
    Math.random()
      .toString(16)
      .slice(2)
  }`;
  const waitBack = waitForPopState();

  window.history.pushState({}, '', randomPath);
  await promiseTick();

  window.history.back();
  await waitBack;
  await promiseTick();

  expect(window.location.pathname).toBe(pathname);
}

async function navigateGo() {
  const pathname = window.location.pathname;
  const randomPath = `/issue-89-${
    Math.random()
      .toString(16)
      .slice(2)
  }`;
  const waitBack = waitForPopState();

  window.history.pushState({}, '', randomPath);
  await promiseTick();

  window.history.go(-1);
  await waitBack;
  await promiseTick();

  expect(window.location.pathname).toBe(pathname);
}

describe('clearOnUrlChange', () => {
  beforeEach(async () => {
    updateGlobalOptions({ clearOnUrlChange: true });
    toast.clearAll(undefined, false);
    window.history.replaceState({}, '', '/');
    await promiseTick();
  });

  afterEach(async () => {
    toast.clearAll(undefined, false);
    updateGlobalOptions({});
    window.history.replaceState({}, '', '/');
    vi.restoreAllMocks();
    await promiseTick();
  });

  it('keeps toast when history.back() is called and clearOnUrlChange is false', async () => {
    updateGlobalOptions({ clearOnUrlChange: false });
    const id = toast('hello', { autoClose: false });

    await screen.findByTestId(`toast-item-${id}`);
    await navigateBack();

    expect(screen.getByTestId(`toast-item-${id}`)).toBeInTheDocument();
  });

  it('keeps toast when history.go(-1) is called and clearOnUrlChange is false', async () => {
    updateGlobalOptions({ clearOnUrlChange: false });
    const id = toast('hello', { autoClose: false });

    await screen.findByTestId(`toast-item-${id}`);
    await navigateGo();

    expect(screen.getByTestId(`toast-item-${id}`)).toBeInTheDocument();
  });

  it('clears toast when history.back() is called and clearOnUrlChange is true', async () => {
    updateGlobalOptions({ clearOnUrlChange: true });
    const dismissSpy = vi.spyOn(ToastActions, 'dismiss');
    const id = toast('hello', { autoClose: false });

    await screen.findByTestId(`toast-item-${id}`);
    await navigateBack();

    expect(dismissSpy).toHaveBeenCalledWith(id);
  });

  it('supports toast-level clearOnUrlChange override when global is true', async () => {
    updateGlobalOptions({ clearOnUrlChange: true });
    const dismissSpy = vi.spyOn(ToastActions, 'dismiss');
    const keptId = toast('keep me', {
      autoClose: false,
      clearOnUrlChange: false,
    });
    const clearId = toast('clear me', { autoClose: false });

    await screen.findByTestId(`toast-item-${keptId}`);
    await screen.findByTestId(`toast-item-${clearId}`);
    await navigateBack();

    expect(screen.getByTestId(`toast-item-${keptId}`)).toBeInTheDocument();
    expect(dismissSpy).toHaveBeenCalledWith(clearId);
    expect(dismissSpy).not.toHaveBeenCalledWith(keptId);
  });

  it('supports toast-level clearOnUrlChange override when global is false', async () => {
    updateGlobalOptions({ clearOnUrlChange: false });
    const dismissSpy = vi.spyOn(ToastActions, 'dismiss');
    const keptId = toast('keep me', { autoClose: false });
    const clearId = toast('clear me', {
      autoClose: false,
      clearOnUrlChange: true,
    });

    await screen.findByTestId(`toast-item-${keptId}`);
    await screen.findByTestId(`toast-item-${clearId}`);
    await navigateBack();

    expect(screen.getByTestId(`toast-item-${keptId}`)).toBeInTheDocument();
    expect(dismissSpy).toHaveBeenCalledWith(clearId);
    expect(dismissSpy).not.toHaveBeenCalledWith(keptId);
  });
});
