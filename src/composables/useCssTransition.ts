import { computed, nextTick, onMounted, reactive, ref, Ref, watchEffect } from 'vue';
import { Default, SyntheticEvent } from '../utils/constant';
import { AnimationStep, CSSTransitionProps, Id } from '../types';
import { getAllToast } from './useToastContainer';
import { eventManager, Event as EventTypes } from '../core';

interface OtherProps {
  toastRef: Ref<HTMLDivElement | undefined>;
  toastId: Id;
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

  requestAnimationFrame(() => {
    style.minHeight = 'initial';
    style.height = scrollHeight + 'px';
    style.transition = `all ${duration}ms`;

    requestAnimationFrame(() => {
      style.height = '0';
      style.padding = '0';
      style.margin = '0';
      setTimeout(done, duration as number);
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

  const enterClassName = computed(() => options.appendPosition ? `${options.enter}--${options.position}` : options.enter);
  const exitClassName = computed(() => options.appendPosition ? `${options.exit}--${options.position}` : options.exit);

  function playToast() {
    isRunning.value = true;
  }

  // function pauseToast() {
  //   isRunning.value = false;
  // }

  function onExitHandler() {
    const node = props.toastRef.value as HTMLDivElement;

    if (!node) return;

    const onExited = () => {
      const doneHandler = (options.done || NullCallback) as () => void;
      node.removeEventListener('animationend', onExited);
      if (options.collapse) {
        collapseToast(node, doneHandler, options.collapseDuration);
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

  function closeToast() {
    eventManager.emit(EventTypes.Remove, options.toastId as Id);
    nextTick(() => {
      isIn.value = false;
    });
  }

  watchEffect(
    () => {
      const all = getAllToast();
      isIn.value = all.findIndex(v => v.toastId === options.toastId) > -1;
    },
  );

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
  });

  return { isIn, isRunning, closeToast };
}
