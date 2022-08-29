import props from './prop';
import { CloseButton } from '../CloseButton';
import { Default } from '../../utils/constant';
import { computed, DefineComponent, defineComponent } from 'vue';
import { toastOptionList } from '../..';
import type { ToastOptions, ToastTheme, ToastType } from '../../types';
import ProgressBar from '../progress-bar/ProgressBar';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  setup(_props: ToastOptions) {
    const toasts = computed(() => toastOptionList.value.filter(v => v.position === _props.position));

    return () => (
      <>
        {
          toasts.value.map((item) => {
            const className = [
              `${Default.CSS_NAMESPACE}__toast`,
              `${Default.CSS_NAMESPACE}__toast-theme--${item.theme}`,
              `${Default.CSS_NAMESPACE}__toast--${item.type}`,
            ].join(' ');

            return (
              <div
                key={item.toastId as string}
                id={item.toastId as string}
                class={className}
              >
              {/* content */}
              <div
                role="alert"
                class={`${Default.CSS_NAMESPACE}__toast-body`}
              >
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
          })
        }
      </>
    );
  },
}) as DefineComponent<ToastOptions>;

export default ToastifyContainer;
