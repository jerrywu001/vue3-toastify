import type { App } from 'vue';
import { Default, POSITION } from './constant';
import type {
  Id,
  ToastClassName,
  ToastOptions,
  ToastPosition,
  TransitionGroupOptions,
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

export function cacheRenderInstance(app: App<Element>, id: Id) {
  const container = document.getElementById(String(id));
  if (container) {
    window.toastInsMap = window.toastInsMap || {};
    window.toastInsMap[container.id] = app;
  }
}

export function unmountContainer(options: ToastOptions) {
  const id = getContainerId(options);
  window.toastInsMap[id].unmount();
  document.getElementById(String(id))?.remove();
}

export function generateRenderRoot(options: ToastOptions & TransitionGroupOptions) {
  const { position, className, rtl = false } = options;
  const rootClass = Default.CSS_NAMESPACE;
  const toastPosClassName = getToastPosClassName(position);
  const existRoot = !!document.querySelector(`.${rootClass}`);
  const existRenderRoot = !!document.querySelector(`.${toastPosClassName}`);
  const container = document.querySelector(`.${rootClass}`) || document.createElement('div');
  const renderRoot = document.createElement('div');

  renderRoot.className = getContainerClassName(
    position as ToastPosition,
    className as ToastClassName,
    rtl,
  );
  renderRoot.id = getContainerId(options);

  if (!existRoot) {
    container.className = Default.CSS_NAMESPACE;
    document.body.appendChild(container);
  }

  if (!existRenderRoot) {
    container.appendChild(renderRoot);
  }

  return renderRoot;
}
