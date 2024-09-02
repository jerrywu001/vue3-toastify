
import { type App, reactive } from 'vue';
import { getDefaultTransition } from '../utils/constant';
import { CSSTransitionProps, Id, ToastOptions, ToastTransition } from '../types';
import { queue, toastContainers } from '.';
import { UnmountTag } from '../utils/render';

function unmountComponent(evt: AnimationEvent | string) {
  // @ts-ignore
  const containerId = typeof evt === 'string' ? evt : evt.currentTarget?.id || evt.target?.id;
  const target = document.getElementById(containerId);

  if (target) {
    target.removeEventListener('animationend', unmountComponent, false);
  }

  try {
    containerInstances[containerId].unmount();
    document.getElementById(containerId)?.remove();
    delete containerInstances[containerId];
    delete toastContainers[containerId];
  } catch (error) {
    // error
  }
}

export const containerInstances = reactive({} as Record<string, App<Element>>);

export function cacheRenderInstance(app: App<Element>, id: Id) {
  const container = document.getElementById(String(id));

  if (container) {
    containerInstances[container.id] = app;
  }
}

export function removeContainer(containerId: Id, withExitAnimation = true) {
  const id = String(containerId);

  if (!containerInstances[id]) return;

  const target = document.getElementById(id);

  if (target) {
    target.classList.add(UnmountTag);
  }

  if (withExitAnimation) {
    resolveNodesAnimation(containerId);
    if (target) {
      target.addEventListener('animationend', unmountComponent, false);
    }
  } else {
    unmountComponent(id);
  }
  // remove toast in queue mathch the containerId
  queue.items = queue.items.filter((v) => v.containerId !== containerId);
}

export function clearContainers(withExitAnimation?: boolean) {
  for (const id in containerInstances) {
    removeContainer(id, withExitAnimation);
  }
  // clear queue
  queue.items = [];
}

export function addExitAnimateToNode(item: ToastOptions, clasback?: (node: HTMLElement) => void) {
  const node = document.getElementById(item.toastId as string);

  if (node) {
    let v = item as (CSSTransitionProps & ToastOptions);

    v = {
      ...v,
      ...getDefaultTransition(v.transition as ToastTransition),
    };
    const exitClassName = v.appendPosition ? `${v.exit}--${v.position}` : v.exit;

    node.className += ` ${exitClassName}`;
    if (clasback) {
      clasback(node);
    }
  }
}

function resolveNodesAnimation(containerId: Id) {
  for (const id in toastContainers) {
    if (id === containerId) {
      for (const item of toastContainers[id] || []) {
        addExitAnimateToNode(item);
      }
    }
  }
}
