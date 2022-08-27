import { ToastOptions } from '../types';
import { Default } from './constant';

/**
 * Generate a random toastId
 */
export function generateToastId() {
  return Math.random().toString(36).substring(2, 9);
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
