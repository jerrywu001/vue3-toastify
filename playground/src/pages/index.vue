<script setup lang="ts">
import { h, ref } from 'vue';
import { Button, Divider } from 'ant-design-vue';
import { toast, ToastOptions } from 'vue3-toastify';
import Conditions from '../components/Conditions.vue';
import 'ant-design-vue/es/button/style/index.css';
import 'ant-design-vue/es/divider/style/index.css';

const options = ref({} as ToastOptions);

const onOptionsChange = (opts: ToastOptions) => {
  options.value = opts;
};

function showToast() {
  toast.success(`Wow so easy! ${parseInt(String(Math.random() * 100000), 10)}`, options.value);
}

function showLoadToast() {
  toast.loading(`Wow so easy! ${parseInt(String(Math.random() * 100000), 10)}`, options.value);
}

const clearAll = () => {
  toast.clearAll();
};

const displayPromise = () => {
  // eslint-disable-next-line no-promise-executor-return
  const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
  toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
  );

  // eslint-disable-next-line no-promise-executor-return
  const functionThatReturnPromise = () => new Promise((resolve, reject) => setTimeout(reject, 3000));
  toast.promise(
    functionThatReturnPromise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
  );

  const resolveWithSomeData =
      // eslint-disable-next-line no-promise-executor-return
      new Promise<{ message: string; }>((resolve, reject) => setTimeout(() => reject({ message: 'world' }), 3000));
  toast.promise(
    resolveWithSomeData,
    {
      pending: {
        render() {
          return "I'm loading";
        },
        icon: false,
      },
      success: {
        render({ data }) {
          return `Hello ${data.message}`;
        },
        // other options
        icon: '🟢',
      },
      error: {
        render({ data }) {
          // When the promise reject, data will contains the error
          return h('div', `error ${data.message}`);
          // return `error ${data.message}`;
        },
        // render: 'just text',
        // render: h('div', 'error'),
      },
    },
    {
      position: toast.POSITION.TOP_LEFT,
    },
  );
};
</script>

<template>
  <div style="padding: 0 24px 22px; margin: 0 auto; max-width: 1192px;">
    <div class="btn-group">
      <Button type="primary" @click="showToast">toast</Button>
      <Button type="primary" @click="displayPromise">promise</Button>
      <Button type="primary" @click="showLoadToast">🚴🏽 loading toast</Button>
      <Button type="primary" danger @click="clearAll">unmount all container</Button>
    </div>

    <Divider>Important Props</Divider>

    <Conditions
      @on-change="onOptionsChange"
    />
  </div>
</template>

<style scoped lang="postcss">
.btn-group {
  display: flex;
  flex-wrap: wrap;

  .ant-btn {
    margin-right: 8px;
    margin-bottom: 8px;
  }
}

.ant-breadcrumb {
  margin-bottom: 8px;
}

html.dark {
  .ant-divider-horizontal.ant-divider-with-text {
    color: #fff;
    border-color: #8a8989;
  }

  .ant-breadcrumb-link,
  .ant-breadcrumb-separator {
    color: #fff !important;
  }
}
</style>
