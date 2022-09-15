/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ProgressBarProps, props as properties } from './prop';
import { computed, CSSProperties, DefineComponent, defineComponent, onMounted, ref } from 'vue';
import { Default } from '../../utils/constant';
import { isFn } from '../../utils/tools';

const ProgressBar = defineComponent({
  name: 'ProgressBar',
  props: properties,
  // @ts-ignore
  setup(props: ProgressBarProps, { attrs }) {
    const nodeRef = ref<HTMLDivElement>();

    const ariaHidden = computed(() => props.hide ? 'true' : 'false');

    const style = computed<CSSProperties>(() => ({
      ...(attrs.style as CSSProperties || {}),
      animationDuration: `${props.autoClose === true ? 5000 : props.autoClose}ms`,
      animationPlayState: props.isRunning ? 'running' : 'paused',
      opacity: props.hide ? 0 : 1,
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

    const classNames = computed(
      () => isFn(props.className)
        ? props.className({
          rtl: props.rtl,
          type: props.type,
          defaultClassName: defaultClassName.value,
        })
        : `${defaultClassName.value} ${props.className || ''}`,
    );

    // 🧐 controlledProgress is derived from progress
    // so if controlledProgress is set, it means that this is also the case for progress
    const animationEventName = computed(() => props.controlledProgress && props.progress! >= 1
      ? 'ontransitionend'
      : 'onanimationend');
    const animationEventHandler = computed(() => props.controlledProgress && props.progress! < 1
      ? null
      : () => {
        if (props.isIn && props.closeToast && props.autoClose !== false) {
          props.closeToast();
        }
      });

    onMounted(() => {
      if (nodeRef.value) {
        nodeRef.value[animationEventName.value] = animationEventHandler.value;
      }
    });

    return () => (
      <div
        ref={nodeRef}
        role="progressbar"
        aria-hidden={ariaHidden.value}
        aria-label="notification timer"
        class={classNames.value}
        style={style.value}
      />
    );
  },
}) as DefineComponent<ProgressBarProps>;

export default ProgressBar;
