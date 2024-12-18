<script setup lang="ts">
import { h, ref } from 'vue';
import { Divider } from 'ant-design-vue';
import { toast, ToastOptions } from 'vue3-toastify';
import constomCompo from '../components/constomCompo.vue';
import Conditions from '../components/Conditions.vue';
import ToastCode from '../components/ToastCode.vue';
import RegisteGloablCode from '../components/RegisteGloablCode.vue';

import 'ant-design-vue/es/button/style/index.js';
import 'ant-design-vue/es/divider/style/index.js';

const options = ref({} as ToastOptions);

const onOptionsChange = (opts: ToastOptions) => {
  options.value = opts;
};

function showToast() {
  toast(constomCompo, {
    ...options.value,
    contentProps: {
      title: 'narges1',
      color: '#ff0',
    },
  });
}

function showLoadToast() {
  toast.loading(`I can not auto close! ${parseInt(String(Math.random() * 100000), 10)}`, options.value);
}

const clearAll = () => {
  toast.clearAll();
};

const displayPromise = () => {

  const resolveAfter3Sec = new Promise((resolve) => setTimeout(resolve, 3000));

  toast.promise(
    resolveAfter3Sec,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
    { ...options.value },
  );

  const functionThatReturnPromise = () => new Promise((resolve, reject) => setTimeout(reject, 3000));

  toast.promise(
    functionThatReturnPromise,
    {
      pending: 'Promise is pending',
      success: 'Promise resolved 👌',
      error: 'Promise rejected 🤯',
    },
    { ...options.value },
  );

  const resolveWithSomeData =

      new Promise<{ message: string }>((resolve, reject) => setTimeout(() => reject({ message: 'world' }), 3000));

  toast.promise(
    resolveWithSomeData,
    {
      pending: {
        render() {
          return 'I\'m loading';
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
          return h('div', `inject data: ${data.message}`);
          // return `inject data: ${data.message}`;
        },
        // render: 'just text',
        // render: h('div', 'error'),
      },
    },
    {
      ...options.value,
      position: toast.POSITION.BOTTOM_CENTER,
    },
  );
};
</script>

<template>
  <div style="padding: 0 24px 22px; margin: 0 auto; max-width: 1192px;">
    <Divider>The playground</Divider>

    <div class="btn-group">
      <button class="my-btn" @click="showToast">
        normal toast
      </button>
      <button class="my-btn" @click="displayPromise">
        with promise
      </button>
      <button class="my-btn" @click="showLoadToast">
        🚴🏽 loading toast
      </button>
      <button class="my-btn danger" @click="clearAll">
        unmount all container
      </button>
    </div>

    <Conditions
      @on-change="onOptionsChange"
    />
    <ToastCode :options="options" />

    <Divider />

    <h5 align="center" style="font-size: 16px; text-align: left;">
      Registe global components (For example antd)
    </h5>

    <RegisteGloablCode />

    <br>
    <br>

    <Divider />

    <h2 align="center" style="font-size: 26px; font-weight: bold; padding: 10px 0 22px;">
      Special Sponsor
    </h2>

    <p align="center">
      <a
        target="_blank"
        rel="external dofollow"
        title="banning sensor"
        href="https://www.bnsense.com/"
      >
        <img alt="special sponsor appwrite" src="https://www.bnsense.com/uploads/LOGO/imgs/logo_1704355682323.png" width="160">
      </a>
    </p>
  </div>
</template>

<style lang="postcss">
.btn-group {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 28px;

  .my-btn {
    color: #fff;
    border-color: #5672cd;
    background-color: #5672cd;
    border-radius: 20px;
    padding: 5px 18px;
    margin: 0 8px 8px 0;

    &:hover {
      border-color: #2e4388;
      background-color: #2e4388;
    }

    &.danger {
      border-color: #fa3737;
      background-color: #fa3737;

      &:hover {
        border-color: #c92929;
        background-color: #c92929;
      }
    }
  }
}

html.dark {
  .ant-divider-horizontal.ant-divider-with-text {
    color: #fff;
    border-color: #8a8989;
  }

  h2, h5 {
    color: #fff;
  }
}
</style>
