import type { App, DefineComponent, VNode } from 'vue';

/**
 * Used when providing custom icon
 */
export interface IconProps {
  theme: ToastTheme;
  type: ToastType;
  path?: string;
}

export type BuiltInIconProps = HTMLOrSVGElement & IconProps;

export type Content =
  | string
  | VNode
  | ((props: ToastContentProps) => VNode)
  | DefineComponent<{}, {}, any>
  |any;

export type ToastFunc = {(content: Content, options?: ToastOptions): void};

export type Id = number | string;

export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'loading' | 'default';
export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center';
export type ToastTransition = 'zoom' | 'flip' | 'bounce' | 'slide' | 'none';
export type ToastTheme = 'auto' | 'light' | 'dark' | 'colored';

export interface CloseButtonProps {
  closeToast: (e: MouseEvent) => void;
  type: ToastType;
  ariaLabel?: string;
  theme: ToastTheme;
}

export interface ToastContentProps<Data = {}> {
  closeToast?: (e?: MouseEvent) => void;
  toastProps?: ToastOptions;
  data: Data;
}

export type IconType =
  | boolean
  | string
  | number
  | VNode
  | ((props: IconProps) => VNode)
  | DefineComponent<IconProps, {}, {}>;

export type CloseBtnType =
  | boolean
  | ((props: CloseButtonProps) => VNode)
  | DefineComponent<IconProps, {}, {}>;

/**
 * options for toast
 */
export interface Options {
  /**
   * use like
   * ```
   * toast.info("Hello World.\n I am <b>Tom</b>", { dangerouslyHTMLString: true });
   * ```
   *
   * @default false
   */
  dangerouslyHTMLString?: boolean;
  /**
   * Support right to left content
   * @default false
   */
  rtl?: boolean;

  /** Used to identify the ToastContainer when working with multiple container. Also used to set the id attribute */
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
  closeButton?: CloseBtnType;

  /**
   * A reference to a valid react-transition-group/Transition component
   * @default 'bounce'
   */
  transition?: ToastTransition | CSSTransitionProps;
  /**
   * disabled the enter transition (for system)
   * @default false
  */
  disabledEnterTransition?: boolean;
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
   * Add optional classes to the toast wrapper
   * @default -
   */
  toastClassName?: string; // TODO: ToastClassName
  /**
   * Add optional classes to the TransitionGroup container
   * @default ''
   */
  bodyClassName?: string; // TODO: ToastClassName
  /**
   * Add optional inline style to the container
   * @default {}
   */
  style?: Record<string, any>;
  /**
   * Add optional classes to the progress bar
   * @default -
   */
  progressClassName?: string; // TODO: ToastClassName
  /**
   * Add optional inline style to the progress bar
   * @default {}
   */
  progressStyle?: Record<string, any>;
  /**
   * Define the ARIA role for the toasts
   * @default 'alert'
   */
  role?: string;
  /**
   * One of auto, light, dark, colored
   * @description `auto` means automatically detects system theme colors
   * @mark {@link ToastTheme}
   * @default 'auto'
   */
  theme?: ToastTheme;
  /**
   * Used to display a custom icon. Set it to `false` to prevent
   * the icons from being displayed
   * @default -
   */
  icon?: IconType;
  /** app use hander */
  useHandler?: (app: App<Element>) => void;
}

/**
 * options for app.use
 */
export interface ToastContainerOptions extends Options {
  /**
   * clear all toasts on url change
   * @default true
  */
  clearOnUrlChange?: boolean;
  /**
   * support multiple
   * @default true
   */
  multiple?: boolean;
  /**
   * Limit the number of toast displayed at the same time
   *
   * @default undefined
   *
   * @ignore  Auto disabled when `multiple: false`
   */
  limit?: number;
  /**
   * Display newest toast on top
   * @default false
   */
  newestOnTop?: boolean;
  /**
   * Add optional classes to the container
   * @default -
   */
  containerClassName?: string;
}

export interface ToastOptions<Data = {}> extends Options {
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
  data?: Data;

  /**
   * One of info, success, warning, error, default, loading
   * @mark {@link ToastType}
   * @default 'default'
   */
  type?: ToastType;

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
   * An optional inline style to apply.
   */
  toastStyle?: Record<string, any>;

  /**
   * Set the percentage for the controlled progress bar. `Value must be between 0 and 1.`
   */
  progress?: number;

  /** Only available when using `toast.loading' */
  isLoading?: boolean;

  contentProps?: Object;
}

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

export interface Toast {
  content: Content;
  props: ToastOptions;
}

export interface CSSTransitionProps {
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
   * Collapse transition duration (auto disable when collapse: false)
   * `Default: 300`
   */
  collapseDuration?: number;
}

export const enum AnimationStep {
  Enter,
  Exit,
}

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

export type ToastContent<T = unknown> =
  | string
  | VNode
  | ((props: ToastContentProps<T>) => string | VNode)
  | DefineComponent<{}, {}, any>
  | (() => string);

export interface UpdateOptions<T = unknown> extends Nullable<ToastOptions<T>> {
  /**
   * Used to update a toast.
   * Pass any valid ReactNode(string, number, component)
   */
  render?: ToastContent<T>;
}
