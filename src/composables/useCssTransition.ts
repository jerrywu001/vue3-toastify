import { computed, ComputedRef, Events, onMounted, onUnmounted, reactive, ref, Ref, watchEffect } from 'vue';
import { Default, SyntheticEvent } from '../utils/constant';
import { AnimationStep, CSSTransitionProps, ToastProps } from '../types';
import { getAllToast } from '../store/toastContainers';

type EventHandlers<E> = {
  [K in keyof E]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
};

interface OtherProps extends ToastProps {
  toastRef: Ref<HTMLDivElement | undefined>;
  loading: ComputedRef<boolean>;
  /** on propgress end or cancel */
  done?: () => void;
}

const NullCallback = () => {};

/**
 * Used to collapse toast after exit animation
 */
function collapseToast(
  node: HTMLElement,
  done: () => void,
  duration = Default.COLLAPSE_DURATION,
) {
  const { scrollHeight, style } = node;
  const delay = duration as number;

  requestAnimationFrame(() => {
    style.minHeight = 'initial';
    style.height = scrollHeight + 'px';
    style.transition = `all ${delay}ms`;

    requestAnimationFrame(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
      setTimeout(done, delay);
    });
  });
}

export function useCssTransition(props: CSSTransitionProps & OtherProps) {
  const isRunning = ref(false);
  const isIn = ref(false);
  const preventExitTransition = ref(false);
  const animationStep = ref(AnimationStep.Enter);

  const options = reactive({
    ...props,
    appendPosition: props.appendPosition || false,
    collapse: typeof props.collapse === 'undefined' ? true : props.collapse,
    collapseDuration: props.collapseDuration || Default.COLLAPSE_DURATION,
  });

  const doneHandler = (options.done || NullCallback) as () => void;
  const enterClassName = computed(() => options.appendPosition ? `${options.enter}--${options.position}` : options.enter);
  const exitClassName = computed(() => options.appendPosition ? `${options.exit}--${options.position}` : options.exit);

  const eventHandlers = computed<EventHandlers<Events>>(() => props.pauseOnHover ? {
    onMouseenter: pauseToast,
    onMouseleave: playToast,
  } : {});

  function onEnterHandler() {
    const classToToken = enterClassName.value.split(' ');

    getTargetNode().addEventListener(
      SyntheticEvent.ENTRANCE_ANIMATION_END,
      playToast,
      { once: true },
    );

    const onEntered = (e: AnimationEvent) => {
      const node = getTargetNode();
      if (e.target !== node) return;

      node.dispatchEvent(new Event(SyntheticEvent.ENTRANCE_ANIMATION_END));
      node.removeEventListener('animationend', onEntered);
      node.removeEventListener('animationcancel', onEntered);
      if (
        animationStep.value === AnimationStep.Enter &&
        e.type !== 'animationcancel'
      ) {
        node.classList.remove(...classToToken);
      }
    };

    const onEnter = () => {
      const node = getTargetNode();
      node.classList.add(...classToToken);
      node.addEventListener('animationend', onEntered);
      node.addEventListener('animationcancel', onEntered);
    };

    if (props.pauseOnFocusLoss) {
      bindFocusEvents();
    }

    onEnter();
  }

  function onExitHandler() {
    if (!getTargetNode()) return;

    const onExited = () => {
      const node = getTargetNode();
      node.removeEventListener('animationend', onExited);
      if (options.collapse) {
        collapseToast(node, doneHandler, options.collapseDuration);
      } else {
        doneHandler();
      }
    };

    const onExit = () => {
      const node = getTargetNode();
      animationStep.value = AnimationStep.Exit;
      node.className += ` ${exitClassName.value}`;
      node.addEventListener('animationend', onExited);
    };

    if (!isIn.value) {
      if (preventExitTransition.value) {
        onExited();
      } else {
        setTimeout(onExit);
      }
    }
  }

  function getTargetNode() {
    return props.toastRef.value as HTMLDivElement;
  }

  function bindFocusEvents() {
    if (!document.hasFocus()) pauseToast();

    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }

  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }

  function playToast() {
    if (!props.loading.value || props.isLoading === undefined) {
      isRunning.value = true;
    }
  }

  function pauseToast() {
    isRunning.value = false;
  }

  function hideToast(e?: MouseEvent) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    isIn.value = false;
  }

  watchEffect(onExitHandler);

  watchEffect(() => {
    const all = getAllToast();
    isIn.value = all.findIndex(v => v.toastId === options.toastId) > -1;
  });

  watchEffect(() => {
    if (props.isLoading !== undefined) {
      if (props.loading.value) {
        pauseToast();
      } else {
        playToast();
      }
    }
  });

  onMounted(onEnterHandler);

  onUnmounted(() => {
    if (props.pauseOnFocusLoss) {
      unbindFocusEvents();
    }
  });

  return {
    isIn,
    isRunning,
    hideToast,
    eventHandlers,
  };
}
