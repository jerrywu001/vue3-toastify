import { mergeProps, VNodeProps } from 'vue';
import { TransitionGroupOptions } from '../types';
import { Default } from './constant';

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

/**
 * save default props of toast container
 * @param options {@link TransitionGroupOptions}
 */
export function saveGlobalOptions(options = {} as TransitionGroupOptions) {
  localStorage.setItem(`${Default.CSS_NAMESPACE}-default-options`, JSON.stringify(options));
}

/**
 * get default props of toast container
 * @param options {@link TransitionGroupOptions}
 */
export function getGlobalOptions() {
  const str = localStorage.getItem(`${Default.CSS_NAMESPACE}-default-options`);
  return JSON.parse((str || '{}')) as TransitionGroupOptions;
}
