import ProgressBar from './progress-bar/ProgressBar';
import props from './toastify-container/prop';
import { CloseButton } from './CloseButton';
import { computed, DefineComponent, defineComponent, ref } from 'vue';
import { Default, getDefaultTransition } from '../utils/constant';
import type { Id, ToastOptions, ToastPosition, ToastTheme, ToastTransition, ToastType, TransitionGroupOptions } from '../types';
import { getIcon } from './Icons';
import { Event, eventManager } from '../core';
import { useCssTransition } from '../composables';

type Props = ToastOptions & TransitionGroupOptions;

const ToastItem = defineComponent({
  name: 'ToastItem',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(item: Props) {
    const toastRef = ref<HTMLDivElement>();

    const isProgressControlled = computed(() => !!item.rtl);
    const toastIcon = computed(() => getIcon(item));
    const className = computed(() => [
      `${Default.CSS_NAMESPACE}__toast`,
      `${Default.CSS_NAMESPACE}__toast-theme--${item.theme}`,
      `${Default.CSS_NAMESPACE}__toast--${item.type}`,
      item.className || '',
    ].join(' '));

    const { isRunning, isIn, closeToast } = useCssTransition({
      ...getDefaultTransition(item.transition as ToastTransition),
      toastId: item.toastId as Id,
      toastRef,
      position: item.position as ToastPosition,
    });

    return () => (
      <div
        id={item.toastId as string}
        class={className.value}
        style={item.style || {}}
        ref={toastRef}
      >
        {/* content */}
        <div
          role="alert"
          class={`${Default.CSS_NAMESPACE}__toast-body`}
        >
          {
            toastIcon.value != null && (
              <div
                class={
                  [
                    `${Default.CSS_NAMESPACE}__toast-icon`,
                    !item.isLoading ? `${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter` : '',
                  ].join(' ')
                }
              >
                { toastIcon.value }
              </div>
            )
          }
          <div>{item.content}</div>
        </div>

        {/* close button */}
        <CloseButton
          theme={item.theme as ToastTheme}
          closeToast={() => {
            eventManager.emit(Event.Remove, item.toastId as Id);
          }}
        />

        {/* progress bar */}
        <ProgressBar
          className={item.progressClassName}
          style={item.progressStyle}
          rtl={item.rtl}
          theme={item.theme as ToastTheme}
          isIn={isIn.value}
          type={item.type as ToastType}
          hide={item.hideProgressBar}
          isRunning={isRunning.value}
          delay={item.autoClose as number}
          controlledProgress={isProgressControlled.value}
          progress={item.progress}
          closeToast={closeToast}
        />
      </div>
    );
  },
}) as DefineComponent<Props>;

export default ToastItem;
