import { screen } from '@testing-library/vue';
import { describe, it, expect } from 'vitest';
import { toast } from '../../src';

describe('toastify theme', () => {
  it('default theme should be light', async () => {
    const id = toast('hello');
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--light');
  });

  it('light', async () => {
    const id = toast('hello', { theme: toast.THEME.LIGHT });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--light');
  });

  it('dark', async () => {
    const id = toast('hello', { theme: toast.THEME.DARK });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--dark');
  });

  it('colored', async () => {
    const id = toast('hello', { theme: toast.THEME.COLORED });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--colored');
  });

  it('auto with light mode', async () => {
    const id = toast('hello', { theme: toast.THEME.AUTO });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--light');
  });

  it('auto with dark mode', async () => {
    document.documentElement.classList.add('dark'); // change to dark mode

    const id = toast('hello', { theme: toast.THEME.AUTO });
    const target = await screen.findByTestId(`toast-item-${id}`);

    expect(target).toBeInTheDocument();
    expect(target.className).toContain('--dark');
  });
});
