import type {
  CSSTransitionProps,
  Options,
  ToastOptions,
  ToastPosition,
  ToastTheme,
  ToastTransition,
  ToastType,
  TransitionGroupOptions,
} from '../types';

type KeyOfPosition =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'TOP_CENTER'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_CENTER';

type KeyOfType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'DEFAULT';

type KeyOfTransition = 'FLIP' | 'SLIDE' | 'ZOOM' | 'BOUNCE';

type KeyOfTheme = 'LIGHT' | 'DARK' | 'COLORED';

export const POSITION: { [key in KeyOfPosition]: ToastPosition } = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

export const THEME: { [key in KeyOfTheme]: ToastTheme } = {
  LIGHT: 'light',
  DARK: 'dark',
  COLORED: 'colored',
};

export const TYPE: { [key in KeyOfType]: ToastType } = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
  DEFAULT: 'default',
};

export const TRANSITIONS: { [key in KeyOfTransition]: ToastTransition } = {
  BOUNCE: 'bounce',
  SLIDE: 'slide',
  FLIP: 'flip',
  ZOOM: 'zoom',
};

export const defaultOptions = {
  position: POSITION.TOP_RIGHT,
  autoClose: 5000,
  transition: 'bounce',
  hideProgressBar: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  className: '',
  bodyClassName: '',
  style: {},
  progressClassName: '',
  progressStyle: {},
  role: 'alert',
  theme: 'light',
} as Options;

export const defaultTransitionGroupOptions = {
  rtl: false,
  newestOnTop: false,
  toastClassName: '',
} as TransitionGroupOptions;

export const defaultGlobalOptions = {
  ...defaultOptions,
  ...defaultTransitionGroupOptions,
} as TransitionGroupOptions;

export const defaultToastOptions = {
  ...defaultOptions,
  data: {},
  type: TYPE.DEFAULT,
  icon: false,
} as ToastOptions;

export const enum Default {
  COLLAPSE_DURATION = 300,
  DEBOUNCE_DURATION = 50,
  CSS_NAMESPACE = 'Toastify',
}

export const enum SyntheticEvent {
  ENTRANCE_ANIMATION_END = 'd',
}

export const Bounce: CSSTransitionProps = {
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__bounce-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__bounce-exit`,
  appendPosition: true,
};

export const Slide: CSSTransitionProps = {
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__slide-exit`,
  appendPosition: true,
};

export const Zoom: CSSTransitionProps = {
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__zoom-exit`,
};

export const Flip: CSSTransitionProps = {
  enter: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__flip-enter`,
  exit: `${Default.CSS_NAMESPACE}--animate ${Default.CSS_NAMESPACE}__flip-exit`,
};

export function getDefaultTransition(type: ToastTransition | CSSTransitionProps) {
  let result = Bounce as CSSTransitionProps;
  if (!type || typeof type === 'string') {
    switch (type) {
      case 'flip':
        result = Flip;
        break;
      case 'zoom':
        result = Zoom;
        break;
      case 'slide':
        result = Slide;
        break;
      default:
        break;
    }
  } else {
    result = type;
  }
  return result;
}
