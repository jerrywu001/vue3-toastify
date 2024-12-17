<template>
  <div>
    {{ contentProps.title }}
  </div>
  <a-button type="primary" size="small">
    Click me
  </a-button>
</template>

<script setup>
const props = defineProps({
  contentProps: {
    type: Object,
    default: () => ({ title: String }),
  },
});

console.log(props);
</script>
