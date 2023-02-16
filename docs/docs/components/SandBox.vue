<template>
  <Sandbox
    template="vue3-ts"
    :light-theme="lightTheme"
    :dark-theme="darkTheme"
    :rtl="true"
    :code-options="codeOptions"
    :options="getSandpackOptions(props)"
    :custom-setup="{
      deps: {
        'animate.css': '~4.1.1',
        'vue3-toastify': 'latest',
        pinia: '^2.0.22',
      }
    }"
  >
    <slot />
  </Sandbox>
</template>

<script setup lang="ts">
import {
  Sandbox,
  sandboxProps,
  getSandpackOptions,
} from 'vitepress-plugin-sandpack';

const props = defineProps(sandboxProps);
</script>
