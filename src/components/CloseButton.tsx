/* eslint-disable max-len */
import { ToastTheme } from '../types';
import { Default } from '../utils/constant';

export interface CloseButtonProps {
  closeToast: (e: MouseEvent) => void;
  ariaLabel?: string;
  theme: ToastTheme;
}

export function CloseButton({
  closeToast,
  theme,
  ariaLabel = 'close',
}: CloseButtonProps) {
  return (
    <button
      class={`${Default.CSS_NAMESPACE}__close-button ${Default.CSS_NAMESPACE}__close-button--${theme}`}
      type="button"
      onClick={e => {
        e.stopPropagation();
        closeToast(e);
      }}
      aria-label={ariaLabel}
    >
      <svg aria-hidden="true" viewBox="0 0 14 16">
        <path
          fill-rule="evenodd"
          d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
        />
      </svg>
    </button>
  );
}
