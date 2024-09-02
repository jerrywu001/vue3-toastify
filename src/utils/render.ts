import { Default, POSITION } from './constant';
import type {
  ToastClassName,
  ToastContainerOptions,
  ToastOptions,
  ToastPosition,
} from '../types';
import { isFn } from './tools';

function getContainerId(options: ToastOptions) {
  return options.containerId || String(options.position);
}

export const UnmountTag = 'will-unmount';

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

export function generateRenderRoot(options: ToastOptions & ToastContainerOptions) {
  const { position, containerClassName, rtl = false, style = {} } = options;
  const rootClass = Default.CSS_NAMESPACE;
  const toastPosClassName = getToastPosClassName(position);
  const root = document.querySelector(`.${rootClass}`);
  const willRenderRoot = document.querySelector(`.${toastPosClassName}`);
  const existRenderRoot = !!willRenderRoot && !willRenderRoot.className?.includes(UnmountTag);
  const container = root || document.createElement('div');
  const renderRoot = document.createElement('div');

  renderRoot.className = getContainerClassName(
    position as ToastPosition,
    containerClassName as ToastClassName,
    rtl,
  );
  renderRoot.dataset.testid = `${Default.CSS_NAMESPACE}__toast-container--${position}`;
  renderRoot.id = getContainerId(options) as string;

  for (const name in style) {
    if (Object.prototype.hasOwnProperty.call(style, name)) {
      const val = style[name];

      renderRoot.style[name] = val;
    }
  }

  if (!root) {
    container.className = Default.CSS_NAMESPACE;
    document.body.appendChild(container);
  }

  if (!existRenderRoot) {
    container.appendChild(renderRoot);
  }

  return renderRoot;
}
