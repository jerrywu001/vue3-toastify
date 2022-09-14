import type { CSSProperties, DefineComponent, VNode } from 'vue';

export type Content =
  | string
  | VNode
  | ((props: ToastContentProps) => VNode)
  | DefineComponent<{}, {}, any>;

export type ToastFunc = {
  (content: Content, options?: ToastOptions): void;
};

export type Id = number | string;

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'loading' | 'default';
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastTransition = 'zoom' | 'flip' | 'bounce' | 'slide';
export type ToastTheme = 'light' | 'dark' | 'colored';

export interface CloseButtonProps {
  closeToast: (e: MouseEvent) => void;
  type: ToastType;
  ariaLabel?: string;
  theme: ToastTheme;
}

export interface ToastContentProps<Data = {}> {
  closeToast?: (e?: MouseEvent) => void;
  toastProps?: ToastOptions;
  data?: Data;
}

/**
 * options for toast
 */
export interface Options {
  /** toast group id */
  containerId?: Id;
  /**
   * One of top-right, top-center, top-left, bottom-right, bottom-center, bottom-left
   * @mark {@link ToastPosition}
   * @default 'top-right'
   */
  position?: ToastPosition;
  /**
   * Delay in ms to close the toast. If set to false, the notification needs to be closed manually
   * @default 5000
   */
  autoClose?: number | boolean;

  /**
   * Pass a custom close button.
   * To remove the close button pass `false`
   */
  closeButton?:
  | boolean
  | ((props: CloseButtonProps) => VNode)
  | VNode<CloseButtonProps>;

  /**
   * A reference to a valid react-transition-group/Transition component
   * @default 'bounce'
   */
  transition?: ToastTransition | CSSTransitionProps;
  /**
   * Display or not the progress bar below the toast(remaining time)
   * @default false
   */
  hideProgressBar?: boolean;
  /**
   * Keep the timer running or not on hover
   * @default true
   */
  pauseOnHover?: boolean;
  /**
   * Pause the timer when the window loses focus
   * @default true
   */
  pauseOnFocusLoss?: boolean;
  /**
   * Dismiss toast on click
   * @default true
   */
  closeOnClick?: boolean;
  /**
   * Add optional classes to the container
   * @default ''
   */
  className?: ToastClassName;
  /**
   * Add optional classes to the TransitionGroup container
   * @default ''
   */
  bodyClassName?: ToastClassName;
  /**
   * Add optional inline style to the container
   * @default {}
   */
  style?: CSSProperties;
  /**
   * Add optional classes to the progress bar
   * @default -
   */
  progressClassName?: ToastClassName;
  /**
   * Add optional inline style to the progress bar
   * @default {}
   */
  progressStyle?: CSSProperties;
  /**
   * Define the ARIA role for the toasts
   * @default 'alert'
   */
  role?: string;
  /**
   * One of light, dark, colored
   * @mark {@link ToastTheme}
   * @default 'light'
   */
  theme?: ToastTheme;
}

/**
 * options for app.use
 */
export interface ToastContainerOptions extends Options {
  /**
   * Support right to left content
   * @default false
   */
  rtl?: boolean;
  /**
   * Display newest toast on top
   * @default false
   */
  newestOnTop?: boolean;
  /**
   * Add optional classes to the toast
   * @default -
   */
  toastClassName?: string;
  /**
   * Used to limit the number of toast displayed on screen at the same time
   * @default -
   */
  limit?: number;
}

export interface ToastOptions extends Options {
  /**
   * Set a custom `toastId`
   */
  toastId?: Id;

  /**
   * Used during update
   */
  updateId?: Id;

  /** toast content */
  content?: Content;

  /**
   * any additional data you want to pass toast("content", { data: {key: value} })
   * @default {}
   */
  data?: { [key: string]: any };

  /**
   * One of info, success, warning, error, default, loading
   * @mark {@link ToastType}
   * @default 'default'
   */
  type?: ToastType;

  /**
   * Used to display a custom icon. Set it to `false` to prevent
   * the icons from being displayed
   * @default -
   */
  icon?: boolean | string | number | VNode;

  /**
   * Let you delay the toast appearance. Pass a value in ms
   * @default -
   */
  delay?: number;

  /**
   * Called when toast is mounted.
   */
  onOpen?: <T = {}>(props: T) => void;

  /**
   * Called when toast is unmounted.
   */
  onClose?: <T = {}>(props: T) => void;

  /**
   * Called when click inside Toast notification
   * @default -
   */
  onClick?: (event: MouseEvent) => void;

  /**
   * Only available when using toast.update
   * @default -
   */
  render?: VNode | (() => VNode);

  /**
   * An optional css class to set.
   */
  className?: ToastClassName;

  /**
   * An optional inline style to apply.
   */
  style?: CSSProperties;

  /**
   * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
   */
  progress?: number | string;

  isLoading?: boolean;
}

export type ToastProps = ToastOptions & ToastContainerOptions;

/**
 * ClassName for the elements - can take a function to build a classname or a raw string that is cx'ed to defaults
 */
export type ToastClassName =
 | ((context?: {
   type?: ToastType;
   defaultClassName?: string;
   position?: ToastPosition;
   rtl?: boolean;
 }) => string)
 | string;

export type Data = Record<string, unknown>;

export type ToastItemStatus = 'added' | 'removed' | 'updated';

/**
 * for update toast
 */
export interface ToastItem<T = {}> {
  content: Content;
  id: Id;
  theme?: ToastTheme;
  type?: ToastOptions;
  isLoading?: boolean;
  containerId?: Id;
  data: T;
  icon?: VNode | false;
  status: ToastItemStatus;
}

export interface Toast {
  content: Content;
  props: ToastOptions;
}

export interface CSSTransitionProps {
  /** on propgress end or cancel */
  done?: () => void;

  /** toast position */
  position?: ToastPosition;
  /**
   * Css class to apply when toast enter
   */
  enter: string;

  /**
   * Css class to apply when toast leave
   */
  exit: string;

  /**
   * Append current toast position to the classname.
   * If multiple classes are provided, only the last one will get the position
   * For instance `myclass--top-center`...
   * `Default: false`
   */
  appendPosition?: boolean;

  /**
   * Collapse toast smoothly when exit animation end
   * `Default: true`
   */
  collapse?: boolean;

  /**
   * Collapse transition duration
   * `Default: 300`
   */
  collapseDuration?: number;
}

export const enum AnimationStep {
  Enter,
  Exit,
}
