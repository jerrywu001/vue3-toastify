import { computed, ComputedRef, Events, onMounted, onUnmounted, reactive, ref, Ref, watchEffect } from 'vue';
import { Default, SyntheticEvent } from '../utils/constant';
import { AnimationStep, CSSTransitionProps, ToastProps } from '../types';
import { getAllToast } from './useToastContainer';

type EventHandlers<E> = {
  [K in keyof E]?: E[K] extends Function ? E[K] : (payload: E[K]) => void
};

interface OtherProps extends ToastProps {
  toastRef: Ref<HTMLDivElement | undefined>;
  loading: ComputedRef<boolean>;
}

const NullCallback = () => {};
const ExitDuration = 300;

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
    collapse: props.collapse || true,
    collapseDuration: props.collapseDuration || Default.COLLAPSE_DURATION,
  });

  const doneHandler = (options.done || NullCallback) as () => void;
  const enterClassName = computed(() => options.appendPosition ? `${options.enter}--${options.position}` : options.enter);
  const exitClassName = computed(() => options.appendPosition ? `${options.exit}--${options.position}` : options.exit);

  const eventHandlers = computed<EventHandlers<Events>>(() => props.pauseOnHover ? {
    onMouseenter: pauseToast,
    onMouseleave: playToast,
  } : {});

  function bindFocusEvents() {
    if (!document.hasFocus()) pauseToast();

    window.addEventListener('focus', playToast);
    window.addEventListener('blur', pauseToast);
  }

  function unbindFocusEvents() {
    window.removeEventListener('focus', playToast);
    window.removeEventListener('blur', pauseToast);
  }

  watchEffect(() => {
    if (props.isLoading !== undefined) {
      if (props.loading.value) {
        pauseToast();
      } else {
        playToast();
      }
    }
  });

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

  function onExitHandler() {
    const node = props.toastRef.value as HTMLDivElement;

    if (!node) return;

    const onExited = () => {
      if (options.collapse) {
        setTimeout(() => {
          node.removeEventListener('animationend', onExited);
          collapseToast(node, doneHandler, options.collapseDuration);
        }, ExitDuration);
      } else {
        doneHandler();
      }
    };

    const onExit = () => {
      animationStep.value = AnimationStep.Exit;
      node.className += ` ${exitClassName.value}`;
      node.addEventListener('animationend', onExited);
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    if (!isIn.value) preventExitTransition.value ? onExited() : onExit();
  }

  watchEffect(() => {
    const all = getAllToast();
    isIn.value = all.findIndex(v => v.toastId === options.toastId) > -1;
  });

  watchEffect(onExitHandler);

  onMounted(() => {
    const node = props.toastRef.value as HTMLDivElement;
    const classToToken = enterClassName.value.split(' ');

    node.addEventListener(
      SyntheticEvent.ENTRANCE_ANIMATION_END,
      playToast,
      { once: true },
    );

    const onEntered = (e: AnimationEvent) => {
      if (e.target !== props.toastRef.value) return;

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
      node.classList.add(...classToToken);
      node.addEventListener('animationend', onEntered);
      node.addEventListener('animationcancel', onEntered);
    };

    onEnter();

    if (props.pauseOnFocusLoss) {
      bindFocusEvents();
    }
  });

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
