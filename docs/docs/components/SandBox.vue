<template>
  <Sandpack
    :template="template"
    :files="files"
    :options="{
      showLineNumbers: true,
      showTabs: true,
      closableTabs,
      showReadOnly,
      readOnly,
    }"
  />
</template>

<script setup lang="ts">
import {
  Sandpack,
  SandpackFiles,
  SandpackPredefinedTemplate,
} from 'codesandbox-sandpack-vue3';
import { computed, PropType, useSlots } from 'vue';

const slots = useSlots();
const props = defineProps({
  template: {
    type: String as PropType<SandpackPredefinedTemplate>,
    default: 'vue3',
  },
  readOnly: {
    type: Boolean,
    reuqired: false,
    default: undefined,
  },
  closableTabs: {
    type: Boolean,
    reuqired: false,
    default: undefined,
  },
  showReadOnly: {
    type: Boolean,
    default: false,
  },
});

const getDefaultFileName = () => {
  let defaultFilePath = '/src/index.js';
  console.log('props.template', props.template);
  switch (props.template) {
    case 'vanilla-ts':
      defaultFilePath = '/src/index.ts';
      break;
    case 'angular':
      defaultFilePath = '/src/app/app.component.ts';
      break;
    case 'react':
      defaultFilePath = '/App.js';
      break;
    case 'react-ts':
      defaultFilePath = '/App.tsx';
      break;
    case 'vue':
      defaultFilePath = '/src/App.vue';
      break;
    case 'vue3':
      defaultFilePath = '/src/App.vue';
      break;
    case 'svelte':
      defaultFilePath = '/index.js';
      break;
    case 'solid':
      defaultFilePath = '/App.tsx';
      break;
    default:
      break;
  }
  return defaultFilePath;
};

const files = computed<SandpackFiles>(() => {
  const items = {} as SandpackFiles;
  console.log(slots.default());
  // @ts-ignore
  const codeItems = slots.default().filter((v) => v.type === 'div');
  if (Array.isArray(codeItems)) {
    console.log(codeItems);
    codeItems.forEach((v) => {
      const { active, hidden, code = '', readonly, readOnly } = v.props || {};
      let filename = v.props?.filename as string;
      filename = filename || getDefaultFileName();
      filename = filename.startsWith('/') ? filename : `/${filename}`;
      console.log(filename, code);
      if (
        typeof active !== 'undefined' ||
        typeof hidden !== 'undefined' ||
        typeof readonly !== 'undefined'
      ) {
        const editable = !(
          typeof readonly !== 'undefined' || typeof readOnly !== 'undefined'
        );
        items[filename] = {
          code,
          active: typeof active !== 'undefined',
          hidden: typeof hidden !== 'undefined',
          readOnly: props.readOnly || !editable,
        };
      } else {
        items[filename] = code;
      }
    });
  }
  return items;
});
</script>
