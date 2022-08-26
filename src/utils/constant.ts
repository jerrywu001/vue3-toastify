import type { Options, ToastOptions, ToastPosition, ToastType, TransitionGroupOptions } from '../types';

type KeyOfPosition =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'TOP_CENTER'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_CENTER';

type KeyOfType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'LOADING' | 'DEFAULT';

export const POSITION: { [key in KeyOfPosition]: ToastPosition } = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

export const TYPE: { [key in KeyOfType]: ToastType } = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warn',
  ERROR: 'error',
  LOADING: 'loading',
  DEFAULT: 'default',
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
