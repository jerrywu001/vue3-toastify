import props from './prop';
import { CloseButton } from '../CloseButton';
import { Default } from '../../utils/constant';
import { DefineComponent, defineComponent } from 'vue';
import { ProgressBar } from '../ProgressBar';
import { toastOptionList } from '../..';
import type { ToastOptions, ToastTheme, ToastType } from '../../types';

const ToastifyContainer = defineComponent({
  name: 'ToastifyContainer',
  inheritAttrs: false,
  props,
  setup(_props: ToastOptions) {
    return () => (
      <div class="Toastify__toast-container Toastify__toast-container--top-right">
        {
          toastOptionList.value.map((item) => {
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
      </div>
    );
  },
}) as DefineComponent<ToastOptions>;

export default ToastifyContainer;
