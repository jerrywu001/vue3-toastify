import { CSSProperties, PropType, VNode } from 'vue';
import { POSITION, THEME, TYPE } from '../../utils/constant';
import type { Content, CSSTransitionProps, IconType, ToastPosition, ToastTheme, ToastTransition, ToastType } from '../../types';

const props = {
  containerId: {
    type: [String, Number],
    required: false,
    default: '',
  },
  clearOnUrlChange: {
    type: Boolean,
    required: false,
    default: true,
  },
  disabledEnterTransition: {
    type: Boolean,
    required: false,
    default: false,
  },
  dangerouslyHTMLString: {
    type: Boolean,
    required: false,
    default: false,
  },
  multiple: {
    type: Boolean,
    required: false,
    default: true,
  },
  limit: {
    type: Number,
    required: false,
    default: undefined,
  },
  position: {
    type: String as PropType<ToastPosition>,
    required: false,
    default: POSITION.TOP_LEFT,
  },
  bodyClassName: {
    type: String,
    required: false,
    default: '',
  },
  autoClose: {
    type: [Number, Boolean],
    required: false,
    default: false,
  },
  closeButton: {
    type: [Boolean, Function, Object] as PropType<boolean | VNode | (() => VNode)>,
    required: false,
    default: undefined,
  },
  transition: {
    type: [String, Object] as PropType<ToastTransition | CSSTransitionProps>,
    required: false,
    default: 'bounce',
  },
  hideProgressBar: {
    type: Boolean,
    required: false,
    default: false,
  },
  pauseOnHover: {
    type: Boolean,
    required: false,
    default: true,
  },
  pauseOnFocusLoss: {
    type: Boolean,
    required: false,
    default: true,
  },
  closeOnClick: {
    type: Boolean,
    required: false,
    default: true,
  },
  progress: {
    type: Number,
    required: false,
    default: undefined,
  },
  progressClassName: {
    type: String,
    required: false,
    default: '',
  },
  toastStyle: {
    type: Object as PropType<CSSProperties>,
    required: false,
    default() {
      return {};
    },
  },
  progressStyle: {
    type: Object as PropType<CSSProperties>,
    required: false,
    default() {
      return {};
    },
  },
  role: {
    type: String,
    required: false,
    default: 'alert',
  },
  theme: {
    type: String as PropType<ToastTheme>,
    required: false,
    default: THEME.AUTO,
  },
  content: {
    type: [String, Object, Function] as PropType<Content>,
    required: false,
    default: '',
  },
  toastId: {
    type: [String, Number],
    required: false,
    default: '',
  },
  data: {
    type: [Object, String] as PropType<{ [key: string]: any }>,
    required: false,
    default() {
      return {};
    },
  },
  type: {
    type: String as PropType<ToastType>,
    required: false,
    default: TYPE.DEFAULT,
  },
  icon: {
    type: [Boolean, String, Number, Object, Function] as PropType<IconType>,
    required: false,
    default: undefined,
  },
  delay: {
    type: Number,
    required: false,
    default: undefined,
  },
  onOpen: {
    type: Function as PropType<<T = {}>(props: T) => void>,
    required: false,
    default: undefined,
  },
  onClose: {
    type: Function as PropType<<T = {}>(props: T) => void>,
    required: false,
    default: undefined,
  },
  onClick: {
    type: Function as PropType<(event: MouseEvent) => void>,
    required: false,
    default: undefined,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: undefined,
  },
  rtl: {
    type: Boolean,
    required: false,
    default: false,
  },
  toastClassName: {
    type: String,
    required: false,
    default: '',
  },
  updateId: {
    type: [String, Number],
    required: false,
    default: '',
  },
};

export default props;
