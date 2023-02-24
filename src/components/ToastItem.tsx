import ProgressBar from './progress-bar/ProgressBar';
import props from './toastify-container/prop';
import { CloseButton } from './CloseButton';
import { Default, getDefaultTransition } from '../utils/constant';
import { getIcon } from './Icons';
import { isComponent, isFn } from '../utils/tools';
import { ToastActions } from '../store';
import { useCssTransition } from '../composables';
import {
  computed,
  DefineComponent,
  defineComponent,
  h,
  ref,
  toRaw,
} from 'vue';
import type {
  CloseButtonProps,
  Content,
  ToastContainerOptions,
  ToastOptions,
  ToastTheme,
  ToastTransition,
  ToastType,
} from '../types';

const ToastItem = defineComponent({
  name: 'ToastItem',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(item: ToastOptions & ToastContainerOptions) {
    const toastRef = ref<HTMLDivElement>();

    const loading = computed(() => !!item.isLoading);
    const isProgressControlled = computed(() => item.progress !== undefined && item.progress !== null);
    const toastIcon = computed(() => getIcon(item));
    const className = computed(() => [
      `${Default.CSS_NAMESPACE}__toast`,
      `${Default.CSS_NAMESPACE}__toast-theme--${item.theme}`,
      `${Default.CSS_NAMESPACE}__toast--${item.type}`,
      item.rtl ? `${Default.CSS_NAMESPACE}__toast--rtl` : undefined,
      item.toastClassName || '',
    ].filter(Boolean).join(' '));

    const {
      isRunning,
      isIn,
      hideToast,
      eventHandlers,
    } = useCssTransition({
      toastRef,
      loading,
      done: () => { ToastActions.remove(item.toastId); },
      ...getDefaultTransition(item.transition as ToastTransition),
      ...item,
    });

    return () => (
      <div
        id={item.toastId as string}
        class={className.value}
        style={item.toastStyle || {}}
        ref={toastRef}
        data-testid={`toast-item-${item.toastId}`}
        onClick={(e) => {
          if (item.closeOnClick) {
            hideToast();
          }
          if (item.onClick) {
            item.onClick(e);
          }
        }}
        { ...eventHandlers.value }
      >
        <div
          role={item.role}
          data-testid="toast-body"
          class={`${Default.CSS_NAMESPACE}__toast-body ${item.bodyClassName || ''}`}
        >
          {/* icon */}
          {
            toastIcon.value != null && (
              <div
                data-testid={`toast-icon-${item.type}`}
                class={
                  [
                    `${Default.CSS_NAMESPACE}__toast-icon`,
                    !item.isLoading ? `${Default.CSS_NAMESPACE}--animate-icon ${Default.CSS_NAMESPACE}__zoom-enter` : '',
                  ].join(' ')
                }
              >
                {
                  isComponent(toastIcon.value as any)
                    ?
                    h(
                      toRaw(toastIcon.value) as any,
                      {
                        theme: item.theme,
                        type: item.type,
                      },
                    )
                    : isFn(toastIcon.value) ? (toastIcon.value as Function)({
                      theme: item.theme,
                      type: item.type,
                    }) : toastIcon.value
                }
              </div>
            )
          }
          {/* content */}
          <div data-testid="toast-content">
            {
              isComponent(item.content as Content)
                ?
                h(
                  toRaw(item.content) as any,
                  {
                    toastProps: toRaw(item),
                    closeToast: hideToast,
                    data: item.data,
                  },
                )
                : isFn(item.content) ? (item.content as Function)({
                  toastProps: toRaw(item),
                  closeToast: hideToast,
                  data: item.data,
                }) : (
                  item.dangerouslyHTMLString
                    ? h('div', {
                      innerHTML: item.content as string,
                    }) : item.content
                )
            }
          </div>
        </div>

        {/* close button */}
        {
          (item.closeButton === undefined || item.closeButton === true) && (
            <CloseButton
              theme={item.theme as ToastTheme}
              closeToast={(e) => {
                e.stopPropagation();
                e.preventDefault();
                hideToast();
              }}
            />
          )
        }
        {
          isComponent(item.closeButton as any)
            ?
            h(
              toRaw(item.closeButton) as any,
              {
                closeToast: hideToast,
                type: item.type as ToastType,
                theme: item.theme as ToastTheme,
              } as CloseButtonProps,
            )
            : isFn(item.closeButton) ? (item.closeButton as Function)({
              closeToast: hideToast,
              type: item.type as ToastType,
              theme: item.theme as ToastTheme,
            }) : null
        }

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
          autoClose={item.autoClose as number}
          controlledProgress={isProgressControlled.value}
          progress={item.progress}
          closeToast={item.isLoading ? undefined : hideToast}
        />
      </div>
    );
  },
}) as DefineComponent<ToastOptions & ToastContainerOptions>;

export default ToastItem;
