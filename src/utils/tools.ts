import { globalOptions } from '../store';
import { mergeProps, VNodeProps } from 'vue';
import { Content, ToastContainerOptions, ToastTheme } from '../types';
import { Default, defaultGlobalOptions } from './constant';

/**
 * Generate a random toastId
 */
export function generateToastId() {
  return Math.random().toString(36).substring(2, 9);
}

export function isNum(v: any): v is Number {
  return typeof v === 'number' && !isNaN(v);
}

export function isBool(v: any): v is Boolean {
  return typeof v === 'boolean';
}

export function isStr(v: any): v is String {
  return typeof v === 'string';
}

export function isFn(v: any): v is Function {
  return typeof v === 'function';
}

export function parseClassName(v: any) {
  return isStr(v) || isFn(v) ? v : null;
}

export function mergeOptions<T = VNodeProps>(...args: any[]) {
  return mergeProps(...args as VNodeProps[]) as T;
}

export function isComponent(content: Content) {
  return typeof content === 'object'
    && (!!(content as any)?.render || !!(content as any)?.setup || typeof content?.type === 'object');
}

/**
 * save default props of toast container
 * @param options {@link ToastContainerOptions}
 */
export function saveGlobalOptions(options = {} as ToastContainerOptions) {
  globalOptions[`${Default.CSS_NAMESPACE}-default-options`] = options;
}

/**
 * get default props of toast container
 * @param options {@link ToastContainerOptions}
 */
export function getGlobalOptions() {
  return globalOptions[`${Default.CSS_NAMESPACE}-default-options`] || defaultGlobalOptions;
}

export function getSystemTheme(): ToastTheme {
  const systemDark =
    typeof window !== 'undefined'
    && window.matchMedia
    && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const themeClassList = Array.from(document.documentElement.classList).map(v => v.trim());

  return (themeClassList.includes('dark') || systemDark) ? 'dark' : 'light';
}
