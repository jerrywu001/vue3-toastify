import { screen } from '@testing-library/vue';
import { Id, toast } from '../src';

describe('toastify', () => {
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
});
