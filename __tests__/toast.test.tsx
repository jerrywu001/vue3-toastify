import { fireEvent, screen } from '@testing-library/vue';
import { nextTick } from 'process';
import { Id, toast } from '../src';

describe('toastify', () => {
  afterEach(() => {
    toast.clearAll();
  });

  it('Should not crash if no container is mounted', async () => {
    await toast('hello');
    const content = await screen.findByTestId('toast-content');
    expect(content).toBeInTheDocument();
    expect(content.innerHTML).toBe('hello');
  });

  it('Should return a new id each time we emit a notification', () => {
    let firstId, secondId;

    firstId = toast('Hello');
    secondId = toast('Hello');

    expect(firstId).not.toEqual(secondId);
  });

  it('Should use the custom toastId from options', () => {
    const toastId = 11;
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should allow the custom toastId from options to be a string', () => {
    const toastId = 'xxxx';
    const id = toast('Hello', { toastId });

    expect(id).toEqual(toastId);
  });

  it('Should not use the provided invalid toastId from options', () => {
    const toastId = Symbol('myId') as unknown as Id;
    const id = toast('Hello', { toastId });

    expect(id).not.toEqual(toastId);
  });

  it('support rtl mode', async () => {
    const id = toast('Hello', { rtl: true });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target.className).toContain('--rtl');
  });

  it('should exit on click', async () => {
    const id = toast('hello');
    const target = await screen.findByTestId(`toast-item-${id}`);
    expect(target).toBeInTheDocument();

    await fireEvent.click(target);

    nextTick(() => {
      expect(target.className).toContain('-animate');
      expect(target.className).toContain('-exit');
    })
  });

  it('should pause on hove, running on leave', async () => {
    const id = toast('hello');
    const target = await screen.findByTestId(`toast-item-${id}`);
    expect(target).toBeInTheDocument();

    await fireEvent.mouseOver(target);

    nextTick(() => {
      const progressBar = target.querySelector('.Toastify__progress-bar') as HTMLElement;
      expect(progressBar.style.animationPlayState).toBe('paused');
    });
  });

  it('should pause on lost foucs on window', async () => {
    const id = toast('hello');
    const target = await screen.findByTestId(`toast-item-${id}`);
    expect(target).toBeInTheDocument();

    await fireEvent.focusOut(window);

    nextTick(() => {
      const progressBar = target.querySelector('.Toastify__progress-bar') as HTMLElement;
      expect(progressBar.style.animationPlayState).toBe('paused');
    });

    nextTick(async () => {
      await fireEvent.focus(window);
      nextTick(() => {
        const progressBar = target.querySelector('.Toastify__progress-bar') as HTMLElement;
        expect(progressBar.style.animationPlayState).toBe('running');
      });
    });
  });
});
