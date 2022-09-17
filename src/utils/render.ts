import { Default, POSITION } from './constant';
import type {
  ToastClassName,
  ToastOptions,
  ToastPosition,
  ToastProps,
} from '../types';
import { isFn } from './tools';

export function toastContainerInScreen(position = POSITION.TOP_RIGHT as ToastPosition) {
  return !!document.querySelector(`.${Default.CSS_NAMESPACE}__toast-container--${position}`);
}

export function getToastPosClassName(position = POSITION.TOP_RIGHT as ToastPosition) {
  return `${Default.CSS_NAMESPACE}__toast-container--${position}`;
}

export function getContainerClassName(position: ToastPosition, className: ToastClassName, rtl = false) {
  const defaultClassName = [
    `${Default.CSS_NAMESPACE}__toast-container`,
    `${Default.CSS_NAMESPACE}__toast-container--${position}`,
    rtl ? `${Default.CSS_NAMESPACE}__toast-container--rtl` : null,
  ].filter(Boolean).join(' ');

  return isFn(className)
    ? className({
      position,
      rtl,
      defaultClassName,
    })
    : `${defaultClassName} ${className || ''}`;
}

export function getContainerId(options: ToastOptions) {
  return options.containerId || String(options.position);
}

export function generateRenderRoot(options: ToastProps) {
  const { position, containerClassName, rtl = false, style = {} } = options;
  const rootClass = Default.CSS_NAMESPACE;
  const toastPosClassName = getToastPosClassName(position);
  const existRoot = !!document.querySelector(`.${rootClass}`);
  const existRenderRoot = !!document.querySelector(`.${toastPosClassName}`);
  const container = document.querySelector(`.${rootClass}`) || document.createElement('div');
  const renderRoot = document.createElement('div');

  renderRoot.className = getContainerClassName(
    position as ToastPosition,
    containerClassName as ToastClassName,
    rtl,
  );
  renderRoot.id = getContainerId(options) as string;

  for (const name in style) {
    if (Object.prototype.hasOwnProperty.call(style, name)) {
      const val = style[name];
      renderRoot.style[name] = val;
    }
  }

  if (!existRoot) {
    container.className = Default.CSS_NAMESPACE;
    document.body.appendChild(container);
  }

  if (!existRenderRoot) {
    container.appendChild(renderRoot);
  }

  return renderRoot;
}
