import { ToastClassName, ToastOptions, ToastPosition, TransitionGroupOptions } from '../types';
import { Default, POSITION } from './constant';
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

export function generateRenderRoot(options: ToastOptions & TransitionGroupOptions) {
  const { position, className, rtl = false } = options;
  const rootClass = Default.CSS_NAMESPACE;
  const toastPosClassName = getToastPosClassName(position);
  const existRoot = !!document.querySelector(`.${rootClass}`);
  const existRenderRoot = !!document.querySelector(`.${toastPosClassName}`);
  const container = document.createElement('div');
  const renderRoot = document.createElement('div');

  renderRoot.className = getContainerClassName(
    position as ToastPosition,
    className as ToastClassName,
    rtl,
  );

  if (!existRoot) {
    container.className = Default.CSS_NAMESPACE;
    document.body.appendChild(container);
  }

  if (!existRenderRoot) {
    container.appendChild(renderRoot);
    document.body.appendChild(container);
  }

  return renderRoot;
}
