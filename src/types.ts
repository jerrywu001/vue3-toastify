/* eslint-disable @typescript-eslint/no-empty-interface */
import type { VNode } from 'vue';

export type Content = string | VNode | (() => VNode);

export type ToastFunc = {
  (content: Content, options?: ToastOptions): void;
};

export type ToastType = 'info' | 'success' | 'error' | 'warn' | 'loading' | 'default';

/**
 * options for toast
 */
export interface Options {
  /**
   * toast duration
   * @default 5000
   */
  duration?: number;
  /**
   * toast type {@link ToastType}
   * @default ToastType.info
   */
  type?: ToastType;
}

/**
 * options for app.use
 */
export interface GlobalOptions extends Options {
}

export interface ToastOptions extends Options {
}
