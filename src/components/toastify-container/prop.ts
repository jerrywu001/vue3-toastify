import { CSSProperties, PropType, VNode } from 'vue';
import { POSITION, THEME, TYPE } from '../../utils/constant';
import type { Content, ToastPosition, ToastTheme, ToastTransition, ToastType } from '../../types';

const props = {
  containerId: {
    type: String,
    required: false,
    default: '',
  },
  position: {
    type: String as PropType<ToastPosition>,
    required: false,
    default: POSITION.TOP_LEFT,
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
    type: String as PropType<ToastTransition>,
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
  className: {
    type: String,
    required: false,
    default: '',
  },
  style: {
    type: Object as PropType<CSSProperties>,
    required: false,
    default() {
      return {} as CSSProperties;
    },
  },
  progressClassName: {
    type: String,
    required: false,
    default: '',
  },
  progressStyle: {
    type: Object as PropType<CSSProperties>,
    required: false,
    default() {
      return {} as CSSProperties;
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
    default: THEME.LIGHT,
  },
  content: {
    type: [String, Object] as PropType<Content>,
    required: false,
    default: '',
  },
  toastId: {
    type: [String, Number],
    required: false,
    default: '',
  },
  data: {
    type: Object as PropType<{ [key: string]: any }>,
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
    type: [Boolean, String, Number, Object] as PropType<boolean | string | number | VNode>,
    required: false,
    default: undefined,
  },
  delay: {
    type: [Number, Boolean],
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
  render: {
    type: Object as PropType<VNode | (() => VNode)>,
    required: false,
    default: undefined,
  },
  isLoading: {
    type: Boolean,
    required: false,
    default: false,
  },
};

export default props;
