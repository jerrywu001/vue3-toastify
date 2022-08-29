import ProgressBar from './progress-bar/ProgressBar';
import props from './toastify-container/prop';
import { CloseButton } from './CloseButton';
import { computed, DefineComponent, defineComponent } from 'vue';
import { Default } from '../utils/constant';
import type { ToastOptions, ToastTheme, ToastType } from '../types';
import { getIcon } from './Icons';

const ToastItem = defineComponent({
  name: 'ToastItem',
  inheritAttrs: false,
  props,
  setup(item: ToastOptions) {
    const className = computed(() => [
      `${Default.CSS_NAMESPACE}__toast`,
      `${Default.CSS_NAMESPACE}__toast-theme--${item.theme}`,
      `${Default.CSS_NAMESPACE}__toast--${item.type}`,
    ].join(' '));

    const toastIcon = computed(() => getIcon(item));

    return () => (
      <div
        id={item.toastId as string}
        class={className.value}
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
          closeToast={() => {}}
        />

        {/* progress bar */}
        <ProgressBar
          type={item.type as ToastType}
          hide={false}
          isRunning={true}
          delay={item.autoClose as number}
          closeToast={() => {}}
          theme={item.theme as ToastTheme}
        />
      </div>
    );
  },
}) as DefineComponent<ToastOptions>;

export default ToastItem;
