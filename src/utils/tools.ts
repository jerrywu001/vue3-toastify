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
  const container = document.createElement('div');
  const renderRoot = document.createElement('div');
  const containerClassName = `${Default.CSS_NAMESPACE}__toast-container`;

  container.className = Default.CSS_NAMESPACE;
  renderRoot.className = `${containerClassName} ${containerClassName}--${position}`;
  container.appendChild(renderRoot);
  document.body.appendChild(container);

  return renderRoot;
}
