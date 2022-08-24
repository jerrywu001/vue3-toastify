/* eslint-disable arrow-body-style */
import { defineComponent, onMounted, createApp, DefineComponent } from 'vue';
import type { Content, ToastOptions } from 'vue3-toastify';

const Wrapper = defineComponent({
  name: 'ToastifyWrapper',
  props: {
    duration: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    onMounted(() => {
      console.log('props===>', props);
    });

    return () => {
      return (
        <div>jjjjjjjj</div>
      );
    };
  },
}) as DefineComponent<ToastOptions>;

function openToast(content: Content, options: ToastOptions) {
  const { type } = options;
  const renderRoot = document.createElement('div');
  document.body.appendChild(renderRoot);
  console.log(content, options, type);

  // @ts-ignore
  const app = createApp(Wrapper, options);
  app.mount(renderRoot);
}

/** default toast */
const toast = (content: Content, options: ToastOptions) => openToast(content, { ...options, type: 'default' });
/** info toast */
toast.info = (content: Content, options: ToastOptions) => openToast(content, { ...options, type: 'info' });
/** error toast */
toast.error = (content: Content, options: ToastOptions) => openToast(content, { ...options, type: 'error' });
/** warning toast */
toast.warn = (content: Content, options: ToastOptions) => openToast(content, { ...options, type: 'warn' });
/** success toast */
toast.success = (content: Content, options: ToastOptions) => openToast(content, { ...options, type: 'success' });

export default toast;
