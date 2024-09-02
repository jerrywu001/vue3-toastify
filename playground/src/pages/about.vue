<template>
  <div>about</div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';

toast.error('Error message', {
  toastId: 'status',
  autoClose: false, 
});

setTimeout(() => {
  toast.update('status', {
    type: 'success',
    autoClose: 3500,
    transition: 'flip', 
  });

  setTimeout(() => {
    toast.update('status', {
      type: 'info',
      autoClose: 5500,
      theme: 'dark',
      icon: '👋',
      position: 'bottom-center', 
    });
  }, 2000);
}, 3000);
</script>
