<template>
  <div>
    <p>I am a vue component</p>
    <p>Position: {{ toastProps?.position }}</p>
    <button style="color: red;" @click="($event) => { closeToast && closeToast($event) }">
      Click me to close toast
    </button>
  </div>
</template>

<script setup lang="ts">
import { ToastProps } from 'jerry-todo';
import { PropType } from 'vue';

defineProps({
  closeToast: Function as PropType<(e?: MouseEvent) => void>,
  toastProps: Object as PropType<ToastProps>,
});
</script>
