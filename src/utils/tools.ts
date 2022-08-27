import { ToastOptions } from '../types';
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

export function generateRenderRoot(options: ToastOptions) {
  const { position } = options;
  const existContainer = !!document.querySelector(`.${Default.CSS_NAMESPACE}`);
  const container = document.createElement('div');
  const renderRoot = document.createElement('div');
  const containerClassName = `${Default.CSS_NAMESPACE}__toast-container`;

  renderRoot.className = `${containerClassName} ${containerClassName}--${position}`;

  if (!existContainer) {
    container.className = Default.CSS_NAMESPACE;
    container.appendChild(renderRoot);
    document.body.appendChild(container);
  }

  return renderRoot;
}
