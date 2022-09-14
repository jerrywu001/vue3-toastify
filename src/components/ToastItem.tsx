import ProgressBar from './progress-bar/ProgressBar';
import props from './toastify-container/prop';
import {
  cloneVNode,
  computed,
  DefineComponent,
  defineComponent,
  h,
  isVNode,
  ref,
  toRaw,
  VNode,
} from 'vue';
import { CloseButton } from './CloseButton';
import { Default, getDefaultTransition } from '../utils/constant';
import { getIcon } from './Icons';
import { isComponent, isFn } from '../utils/tools';
import { removeOne, useCssTransition } from '../composables';
import type {
  Content,
  Id,
  ToastPosition,
  ToastProps,
  ToastTheme,
  ToastTransition,
  ToastType,
} from '../types';

const ToastItem = defineComponent({
  name: 'ToastItem',
  inheritAttrs: false,
  props,
  // @ts-ignore
  setup(item: ToastProps) {
    const toastRef = ref<HTMLDivElement>();

    const isProgressControlled = computed(() => !!item.rtl);
    const toastIcon = computed(() => getIcon(item));
    const className = computed(() => [
      `${Default.CSS_NAMESPACE}__toast`,
      `${Default.CSS_NAMESPACE}__toast-theme--${item.theme}`,
      `${Default.CSS_NAMESPACE}__toast--${item.type}`,
      item.className || '',
    ].join(' '));

    const { isRunning, isIn, hideToast } = useCssTransition({
      ...getDefaultTransition(item.transition as ToastTransition),
      toastId: item.toastId as Id,
      toastRef,
      position: item.position as ToastPosition,
      done: () => { removeOne(item.toastId); },
    });

    const getCloneCloseVNode = () => cloneVNode(item.closeButton as VNode, {
      closeToast: hideToast,
      type: item.type as ToastType,
      theme: item.theme as ToastTheme,
    });

    return () => (
      <div
        id={item.toastId as string}
        class={className.value}
        style={item.style || {}}
        ref={toastRef}
        onClick={(e) => {
          if (item.closeOnClick) {
            hideToast();
          }
        }}
      >
        <div
          role="alert"
          class={`${Default.CSS_NAMESPACE}__toast-body`}
        >
          {/* icon */}
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
                {
                  isComponent(toastIcon.value as any)
                    ?
                    h(
                      toastIcon.value as any,
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
          <div>
            {
              isComponent(item.content as Content)
                ?
                h(
                  item.content as any,
                  {
                    toastProps: toRaw(item),
                    closeToast: hideToast,
                  },
                )
                : isFn(item.content) ? (item.content as Function)({
                  toastProps: toRaw(item),
                  closeToast: hideToast,
                }) : item.content
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
          isVNode(item.closeButton) && getCloneCloseVNode()
        }
        {
          typeof item.closeButton === 'function' && (
            item.closeButton({
              closeToast: hideToast,
              type: item.type as ToastType,
              theme: item.theme as ToastTheme,
            })
          )
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
          delay={item.autoClose as number}
          controlledProgress={isProgressControlled.value}
          progress={item.progress}
          closeToast={item.isLoading ? undefined : hideToast}
        />
      </div>
    );
  },
}) as DefineComponent<ToastProps>;

export default ToastItem;
