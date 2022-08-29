/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ProgressBarProps, props as properties } from './prop';
import { computed, CSSProperties, DefineComponent, defineComponent } from 'vue';
import { Default } from '../../utils/constant';
import { isFn } from '../../utils/tools';

const ProgressBar = defineComponent({
  name: 'ProgressBar',
  inheritAttrs: false,
  props: properties,
  setup(props) {
    const ariaHidden = computed(() => props.hide ? 'true' : 'false');

    const style = computed<CSSProperties>(() => ({
      ...props.style,
      animationDuration: `${props.delay}ms`,
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
    // so if controlledProgress is set
    // it means that this is also the case for progress
    const animationEvent = computed(
      () => ({
        [props.controlledProgress && props.progress! >= 1
          ? 'onTransitionEnd'
          : 'onAnimationEnd']:
        props.controlledProgress && props.progress! < 1
          ? null
          : () => {
            if (props.isIn && props.closeToast) props.closeToast();
          },
      }),
    );

    return () => (
      <div
        role="progressbar"
        aria-hidden={ariaHidden.value}
        aria-label="notification timer"
        class={classNames.value}
        style={style.value}
        {...animationEvent.value}
      />
    );
  },
}) as DefineComponent<ProgressBarProps>;

export default ProgressBar;
