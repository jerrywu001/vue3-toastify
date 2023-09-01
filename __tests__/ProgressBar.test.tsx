import ProgressBar from '../src/components/progress-bar/ProgressBar';
import { render } from '@testing-library/vue';
import { ProgressBarProps } from '../src/components/progress-bar/prop';
import { vi, describe, beforeEach, afterEach, it, expect } from 'vitest';
import type { ToastTheme } from '../src/types';

const closeToast = vi.fn();

const getProps = (type = 'default') => ({
  type,
  autoClose: 5000,
  isRunning: true,
  rtl: false,
  closeToast,
  isIn: true,
  theme: ['colored', 'light', 'dark'][Math.floor(Math.random() * 3)] as ToastTheme,
} as ProgressBarProps);

describe('ProgressBar', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Should merge className', () => {
    render(<ProgressBar {...getProps()} class="test" />);

    expect(
      document.querySelector('.test')?.classList.contains('test')
    ).toBe(true);
  });

  it('Should be able to hide the progress bar', () => {
    const { container } = render(<ProgressBar {...getProps()} hide />);
    expect((container.firstChild! as HTMLElement).style.opacity).toBe('0');
  });

  it('Should be able to pause animation', () => {
    const { container } = render(
      <ProgressBar {...getProps()} isRunning={false} />
    );
    expect(
      (container.firstChild! as HTMLElement).style.animationPlayState
    ).toBe('paused');
  });

  it('Should render controlled progress bar', () => {
    const { container } = render(
      <ProgressBar {...getProps()} controlledProgress progress={0.7} />
    );
    expect((container.firstChild! as HTMLElement).style.transform).toBe(
      'scaleX(0.7)'
    );
  });
});
