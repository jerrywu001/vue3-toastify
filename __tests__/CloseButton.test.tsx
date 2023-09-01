import { CloseButton } from '../src/components/CloseButton';
import { fireEvent, render, screen } from '@testing-library/vue';
import { vi, describe, it, expect } from 'vitest';

const closeToast = vi.fn();

describe('CloseButton', () => {
  it('Should call closeToast on click', () => {
    render(
      <CloseButton closeToast={closeToast} type="default" theme="light" />
    );

    expect(closeToast).not.toHaveBeenCalled();
    fireEvent.click(screen.getByLabelText('close'));
    expect(closeToast).toHaveBeenCalled();
  });

  it('Should have aria-label set to close by default', () => {
    const { getByLabelText } = render(
      <CloseButton closeToast={closeToast} type="default" theme="dark" />
    );

    expect(getByLabelText('close')).not.toBe(null);
  });
});
