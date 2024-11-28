<template>
  <div>
    {{ contentProps.title }}
  </div>
  <Button type="primary" size="small">
    Click me
  </Button>
</template>

<script setup>
import { Button } from 'ant-design-vue';

const props = defineProps({
  contentProps: {
    type: Object,
    default: () => ({ title: String }),
  },
});

console.log(props);
</script>
