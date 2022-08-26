<script setup lang="ts">
import { toast } from 'vue3-toastify';

function showToast() {
  toast('sfsd', { autoClose: 2000 });
}
</script>

<template>
  <div>
    <div py2 px6>
      <button class="mybtn" @click="showToast">showToast</button>
    </div>
  </div>
</template>

<style lang="postcss">
.mybtn {
  @apply rounded-md border border-light-50 mr-5 p-2 bg-green-500 text-xs text-white;
}
</style>
