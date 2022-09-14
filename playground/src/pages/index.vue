<script setup lang="ts">
import { ref } from 'vue';
import { toast, ToastOptions } from 'jerry-todo';
import Conditions from '../components/Conditions.vue';
// import MsgH from '../components/MsgH.vue';
import Msg from '../components/Msg';
import JsxDemo from '../components/JsxDemo';

const showConditions = ref(false);
const options = ref({} as ToastOptions);

const toggleConditions = () => {
  showConditions.value = !showConditions.value;
};

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

const displayMsg = () => {
  toast(Msg, { closeOnClick: false, autoClose: 8000 });
};
</script>

<template>
  <JsxDemo />
  <button class="c-btn dashed" @click="displayMsg">displayMsg</button>

  <div class="hr" />

  <Conditions
    :visible="showConditions"
    @on-close="toggleConditions"
    @on-change="onOptionsChange"
  />

  <div class="py-2 px-6" style="display: flex;">
    <button class="c-btn dashed" @click="toggleConditions">👉🏽 Open options modal</button>
  </div>

  <div class="py-2 px-6" style="display: flex;">
    <button class="c-btn green" @click="showToast">💡 show toast</button>
    <button class="c-btn green" @click="showLoadToast">🫓 show loading toast</button>
    <button class="c-btn green" @click="clearAll">💣 unmount all container</button>
  </div>
</template>

<style lang="postcss" scoped>
.hr {
  border: 1px #ddd dotted;
  margin: 0 auto 16px;
}

.py-2 {
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
}

.px-6 {
  padding-left: 1.5rem; /* 24px */
  padding-right: 1.5rem; /* 24px */
}

.c-btn {
  border-width: 1px;
  border-radius: 0.375rem;
  border-color: rgba(253, 253, 253, 1);
  margin-right: 1.25rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.dashed {
  border: 1px rgb(182, 181, 181) dashed;
  font-size: 14px;

  &:hover {
    border-color: #666;
    opacity: 0.8;
  }
}

.green {
  background-color: rgba(16, 185, 129, 1);
  color: #fff;
}

.radio {
  background-color: rgba(243, 244, 246, 1);
  color: #333;

  &.active {
    border-color: blue;
    border-style: dashed;
  }
}

input {
  border: 1px #cccc dashed;
  outline: none;
  height: 30px;
  padding: 0 6px !important;
  color: #666 !important;

  &.active {
    border: 1px blue dashed;
  }
}
</style>
