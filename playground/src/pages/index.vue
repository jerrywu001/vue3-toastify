<script setup lang="ts">
import { ref } from 'vue';
import { ToastifyContainer } from 'vue3-toastify';

const count = ref(0);

function changeCount() {
  count.value += 1;
}
</script>

<template>
  <div>
    <div py2 px6>
      <button class="mybtn" @click="changeCount">change count value</button>
    </div>

    <!-- <Demo :count="count" /> -->

    <div style="display: flex;">
      <ToastifyContainer :count="count" />
    </div>
  </div>
</template>

<style lang="postcss">
.mybtn {
  @apply rounded-md border border-light-50 mr-5 p-2 bg-green-500 text-xs text-white;
}
</style>
