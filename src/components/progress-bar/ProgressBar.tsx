import { ProgressBarProps, props as properties } from './prop';
import { computed, CSSProperties, defineComponent, ref, watchEffect } from 'vue';
import { Default } from '../../utils/constant';

const ProgressBar = defineComponent({
  name: 'ProgressBar',
  props: properties,
  // @ts-ignore
  setup(props: ProgressBarProps, { attrs }) {
    const nodeRef = ref<HTMLDivElement>();

    const ariaHidden = computed(() => props.hide ? 'true' : 'false');

    const style = computed<CSSProperties>(() => ({
      ...attrs.style as CSSProperties || {},
      animationDuration: `${props.autoClose === true ? 5000 : props.autoClose}ms`,
      animationPlayState: props.isRunning ? 'running' : 'paused',
      opacity: props.hide || props.autoClose === false ? 0 : 1,
      transform: props.controlledProgress ? `scaleX(${props.progress})` : 'none',
    }));

    const defaultClassName = computed(() => [
      `${Default.CSS_NAMESPACE}__progress-bar`,
      props.controlledProgress
        ? `${Default.CSS_NAMESPACE}__progress-bar--controlled`
        : `${Default.CSS_NAMESPACE}__progress-bar--animated`,
      `${Default.CSS_NAMESPACE}__progress-bar-theme--${props.theme}`,
      `${Default.CSS_NAMESPACE}__progress-bar--${props.type}`,
      props.rtl ? `${Default.CSS_NAMESPACE}__progress-bar--rtl` : null,
    ].filter(Boolean).join(' '));

    const classNames = computed(() => `${defaultClassName.value} ${attrs?.class || ''}`);

    const removeEventListener = () => {
      if (nodeRef.value) {
        nodeRef.value.onanimationend = null;
        nodeRef.value.ontransitionend = null;
      }
    };

    const eventCallback = () => {
      if (props.isIn && props.closeToast && props.autoClose !== false) {
        props.closeToast();
        removeEventListener();
      }
    };

    const animationendEventHandler = computed(() => props.controlledProgress ? null : eventCallback);
    const transitionendEventHandler = computed(() => !props.controlledProgress ? null : eventCallback);

    watchEffect(() => {
      if (nodeRef.value) {
        removeEventListener();
        nodeRef.value.onanimationend = animationendEventHandler.value;
        nodeRef.value.ontransitionend = transitionendEventHandler.value;
      }
    });

    return () =>
      <div
        ref={nodeRef}
        role="progressbar"
        aria-hidden={ariaHidden.value}
        aria-label="notification timer"
        class={classNames.value}
        style={style.value}
      />
    ;
  },
});

export default ProgressBar;
