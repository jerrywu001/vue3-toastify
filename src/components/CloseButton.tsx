import { Default, THEME } from '../utils/constant';
import { type DefineComponent, defineComponent, type PropType } from 'vue';
import { ToastType, type CloseButtonProps, type ToastTheme } from '../types';

export const CloseButton = defineComponent({
  name: 'CloseButton',
  inheritAttrs: false,
  props: {
    theme: {
      type: String as PropType<ToastTheme>,
      required: false,
      default: THEME.AUTO,
    },
    type: {
      type: String as PropType<ToastType>,
      required: false,
      default: THEME.LIGHT,
    },
    ariaLabel: {
      type: String,
      required: false,
      default: 'close',
    },
    closeToast: {
      type: Function as PropType<(e?: MouseEvent) => void>,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    return () =>
      <button
        class={`${Default.CSS_NAMESPACE}__close-button ${Default.CSS_NAMESPACE}__close-button--${props.theme}`}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          if (props.closeToast) props.closeToast(e);
        }}
        aria-label={props.ariaLabel}
      >
        <svg aria-hidden="true" viewBox="0 0 14 16">
          <path
            fill-rule="evenodd"
            d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
          />
        </svg>
      </button>
    ;
  },
}) as DefineComponent<Partial<CloseButtonProps>>;
