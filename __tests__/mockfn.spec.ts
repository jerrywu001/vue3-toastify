import { vi } from 'vitest';

function timer(callback) {
  setTimeout(() => {
    callback();
  }, 5000);
}

describe('mock function test', () => {
  test('toHaveReturnedWith', async () => {
    const init = { test: 'hello' };
    const mockFn = vi.fn().mockImplementation(() => init);
    // const mockFn = vi.fn(() => init);

    await mockFn();

    expect(mockFn).toBeCalledTimes(1);
    expect(mockFn).toHaveReturnedWith(init);
    expect(mockFn.mock.results[0].value).toStrictEqual(init);
  });

  test('promise resolve', async () => { // 不要使用toHaveReturnedWith
    // const mockFn = vi.fn().mockImplementation(apples => Promise.resolve(apples + 1));
    const mockFn = vi.fn(apples => Promise.resolve(apples + 1));
    expect(mockFn).not.toBeCalled();
    expect(mockFn).toBeCalledTimes(0);
    expect(mockFn.mock.calls.length).toBe(0);

    const val = await mockFn(2);

    expect(mockFn).toBeCalledTimes(1);
    expect(val).toBe(3);
    expect(mockFn.mock.results[0].value).toEqual(3);
  });

  test('timers', () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    timer(mockFn);
    vi.advanceTimersByTime(5000);
    expect(mockFn).toBeCalled();
  });
});
