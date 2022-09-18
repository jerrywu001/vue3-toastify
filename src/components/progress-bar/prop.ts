import { HTMLAttributes, PropType } from 'vue';
import { ToastClassName } from '../../types';
import type { ToastTheme, ToastType } from '../../types';
import { THEME, TYPE } from '../../utils/constant';

export const props = {
  autoClose: {
    type: [Number, Boolean],
    required: false,
    default: undefined,
  },
  isRunning: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  type: {
    type: String as PropType<ToastType>,
    required: false,
    default: TYPE.DEFAULT,
  },
  theme: {
    type: String as PropType<ToastTheme>,
    required: false,
    default: THEME.LIGHT,
  },
  hide: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  className: {
    type: [String, Function] as PropType<ToastClassName>,
    required: false,
    default: '',
  },
  controlledProgress: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  rtl: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  isIn: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  progress: {
    type: Number,
    required: false,
    default: undefined,
  },
  closeToast: {
    type: Function,
    required: false,
    default: undefined,
  },
};

export interface ProgressBarProps extends HTMLAttributes {
  /**
   * The animation delay which determine when to close the toast
   */
  autoClose: number | boolean;

  /**
   * Whether or not the animation is running or paused
   */
  isRunning: boolean;

  /**
   * Func to close the current toast
   */
  closeToast?: () => void;

  /**
   * Optional type : info, success ...
   */
  type: ToastType;

  /**
   * The theme that is currently used
   */
  theme: ToastTheme;

  /**
   * Hide or not the progress bar
   */
  hide?: boolean;

  /**
   * Optionnal className
   */
  className?: ToastClassName;

  /**
   * Tell wether or not controlled progress bar is used
   */
  controlledProgress?: boolean;

  /**
   * Controlled progress value
   */
  progress?: number;

  /**
   * Support rtl content
   */
  rtl?: boolean;

  /**
   * Tell if the component is isIn on screen or not
   */
  isIn?: boolean;
}
