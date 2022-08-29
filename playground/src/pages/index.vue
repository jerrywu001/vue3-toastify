<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { toast, ToastPosition } from 'vue3-toastify';

const pos = ref<ToastPosition>('top-right');

function showToast() {
  toast.success('sfsd', {
    position: pos.value,
    autoClose: 2000,
    style: { userSelect: 'none' },
  });
}

const router = useRouter();

const toAbout = () => {
  router.push('/about');
};

const changePos = (value: ToastPosition) => {
  pos.value = value;
};
</script>

<template>
  <div style="position: fixed; top: 50%; margin-top: -50px; left: 50%; margin-left: -325px;">
    <div class="py-2 px-6">
      <button :class="['c-btn radio', { 'active': pos === 'top-left' }]" @click="changePos('top-left')">top-left</button>
      <button :class="['c-btn radio', { 'active': pos === 'top-center' }]" @click="changePos('top-center')">top-center</button>
      <button :class="['c-btn radio', { 'active': pos === 'top-right' }]" @click="changePos('top-right')">top-right</button>
      <button :class="['c-btn radio', { 'active': pos === 'bottom-left' }]" @click="changePos('bottom-left')">bottom-left</button>
      <button
        :class="['c-btn radio', { 'active': pos === 'bottom-center' }]"
        @click="changePos('bottom-center')"
      >
        bottom-center
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === 'bottom-right' }]"
        @click="changePos('bottom-right')"
      >
        bottom-right
      </button>
    </div>
    <div class="py-2 px-6">
      <button class="c-btn green" @click="showToast">💡 showToast</button>
      <button class="c-btn green" @click="toAbout">🚀 to about</button>
    </div>
  </div>
</template>

<style lang="postcss">
.c-btn {
  @apply rounded-md border border-light-50 mr-5 p-2 text-xs;
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
</style>
