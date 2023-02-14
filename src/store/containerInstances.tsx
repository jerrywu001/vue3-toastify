/* eslint-disable guard-for-in */
import { type App, reactive } from 'vue';
import { getDefaultTransition } from '../utils/constant';
import { toastMap } from '../composables';
import { CSSTransitionProps, Id, ToastOptions, ToastTransition } from '../types';

export const containerInstances = reactive({} as Record<string, App<Element>>);

export function cacheRenderInstance(app: App<Element>, id: Id) {
  const container = document.getElementById(String(id));
  if (container) {
    containerInstances[container.id] = app;
  }
}

export function unmountContainer(containerId: Id, withAnimation = true) {
  const id = String(containerId);

  if (!containerInstances[id]) return;

  if (withAnimation) resolveNodesAnimation(containerId);

  setTimeout(() => {
    try {
      containerInstances[id].unmount();
    } catch (error) {
      // error
    }
    document.getElementById(id)?.remove();
    delete containerInstances[id];

    if (Object.prototype.hasOwnProperty.call(toastMap, id)) {
      delete toastMap[id];
    }
  }, 680);
}

export function unmountAllContainer() {
  for (const id in containerInstances) {
    unmountContainer(id);
  }
}

export function addExitAnimateToNode(item: ToastOptions) {
  const node = document.getElementById(item.toastId as string);
  if (node) {
    let v = item as (CSSTransitionProps & ToastOptions);
    v = {
      ...v,
      ...getDefaultTransition(v.transition as ToastTransition),
    };
    const exitClassName = v.appendPosition ? `${v.exit}--${v.position}` : v.exit;
    node.className += ` ${exitClassName}`;
  }
}

function resolveNodesAnimation(containerId: Id) {
  for (const id in toastMap) {
    if (id === containerId) {
      for (const item of (toastMap[id] || [])) {
        addExitAnimateToNode(item);
      }
    }
  }
}
