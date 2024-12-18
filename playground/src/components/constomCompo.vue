<template>
  <div>
    <div>
      {{ contentProps.title }}
    </div>

    <br>

    <a-button type="primary" size="small" @click.prevent.stop="doALert">
      Click me
    </a-button>
  </div>
</template>

<script setup>
const props = defineProps({
  contentProps: {
    type: Object,
    default: () => ({ title: String }),
  },
});

function doALert() {
  alert(1);
}

console.log(props);
</script>
