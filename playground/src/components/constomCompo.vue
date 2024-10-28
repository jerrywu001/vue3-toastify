<template>
  <div>
    {{ contentProps.title }}
  </div>
  <button>Click me</button>
</template>
<script setup>
 
const props = defineProps({
  contentProps: {
    type: Object,
    default: () => ({ title: String }) 
    , 
  }, 
});

console.log(props);
</script>

<style>
button{
  background-color: orange;
  padding: 3px;
  border: 1px solid red
}
</style>