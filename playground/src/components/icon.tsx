/* eslint-disable max-len */
import { ToastType, type IconProps, type ToastTheme } from 'jerry-todo';
import { DefineComponent, defineComponent, PropType } from 'vue';

export const ComponentIcon = defineComponent({
  props: {
    theme: {
      type: String as PropType<ToastTheme>,
    },
    type: {
      type: String as PropType<ToastType>,
    },
    path: {
      type: String,
      required: false,
      default: '',
    },
  },
  // @ts-ignore
  setup(props: IconProps, { attrs }) {
    console.log(props, attrs);
    return () => VNodeIcon;
  },
}) as DefineComponent<IconProps>;

export const VNodeIcon = () => (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
  >
    <path d="M672 234.666667a32 32 0 0 1 0-64v64zM853.333333 352a32 32 0 0 1-64 0H853.333333zM672 170.666667h64v64h-64V170.666667zM853.333333 288v64h-64v-64H853.333333zM736 170.666667A117.333333 117.333333 0 0 1 853.333333 288h-64c0-29.44-23.893333-53.333333-53.333333-53.333333V170.666667zM352 789.333333a32 32 0 0 1 0 64v-64zM170.666667 672a32 32 0 0 1 64 0H170.666667zM352 853.333333h-64v-64h64V853.333333zM170.666667 736v-64h64v64H170.666667zM288 853.333333A117.333333 117.333333 0 0 1 170.666667 736h64c0 29.44 23.893333 53.333333 53.333333 53.333333V853.333333zM672 789.333333a32 32 0 0 0 0 64v-64zM853.333333 672a32 32 0 0 0-64 0H853.333333zM672 853.333333h64v-64h-64V853.333333zM853.333333 736v-64h-64v64H853.333333zM736 853.333333A117.333333 117.333333 0 0 0 853.333333 736h-64c0 29.44-23.893333 53.333333-53.333333 53.333333V853.333333zM234.666667 352a32 32 0 0 1-64 0h64zM352 170.666667a32 32 0 0 1 0 64V170.666667zM170.666667 352v-64h64v64H170.666667zM288 170.666667h64v64h-64V170.666667zM170.666667 288A117.333333 117.333333 0 0 1 288 170.666667v64c-29.44 0-53.333333 23.893333-53.333333 53.333333H170.666667z" fill="#222222" p-id="1491"></path>
    <path d="M170.666667 469.333333m32 0l618.666666 0q32 0 32 32l0 0q0 32-32 32l-618.666666 0q-32 0-32-32l0 0q0-32 32-32Z" fill="#222222" p-id="1492"></path>
  </svg>
);
