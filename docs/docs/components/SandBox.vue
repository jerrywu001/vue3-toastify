<template>
  <Sandpack
    :theme="theme"
    :template="template"
    :files="files"
    :options="{
      showConsoleButton: true,
      showLineNumbers: true,
      showTabs: true,
      closableTabs: closabletabs === 'true',
      readOnly: readonly === 'true',
    }"
  />
</template>

<script setup lang="ts">
import {
  Sandpack,
  type SandpackFiles,
  type SandpackThemeProp,
  type SandpackPredefinedTemplate,
  type SandpackPredefinedTheme,
} from 'codesandbox-sandpack-vue3';
import { renderToString } from 'vue/server-renderer';
import { nextTick, onBeforeMount, onMounted, PropType, ref, useSlots, VNode } from 'vue';

const theme = ref<SandpackThemeProp>('light');
const files = ref<SandpackFiles>({});

const slots = useSlots();

const props = defineProps({
  template: {
    type: String as PropType<SandpackPredefinedTemplate>,
    default: 'vue3',
  },
  readonly: {
    type: String,
    reuqired: false,
    default: undefined,
  },
  closabletabs: {
    type: String,
    reuqired: false,
    default: undefined,
  },
});

const getDefaultFileName = () => {
  let defaultFilePath = '/src/index.js';
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

const getFileAttributes = (className = '') => {
  let path: string | undefined;
  const attrs = className.split(' ');
  const hidden = attrs.includes('[hidden]');
  const readOnly = attrs.includes('[readonly]') || attrs.includes('[readOnly]');
  const active = attrs.includes('[active]');
  const filename = attrs.find(v => v.includes('.'));
  if (filename) {
    path = filename;
    path = path === 'App.vue' ? getDefaultFileName() : path;
    path = path.startsWith('/') ? path : `/${path}`;
  }
  return { hidden, active, readOnly, path };
};

const updateFiles = async () => {
  const items = {} as SandpackFiles;
  const content = (slots.default ? slots.default() : []) as VNode[];
  const codeItems = content.filter((v) => v.type === 'div');

  if (Array.isArray(codeItems)) {
    for await (const v of codeItems) {
      let code = '';
      let div: HTMLDivElement | null = document.createElement('div');
      const children = (v.children || []) as VNode[];
      const { active, hidden, readOnly, path } = getFileAttributes(v.props?.class);
      const filename = path || getDefaultFileName();
      v.children = children.filter((c) => c.type === 'pre');

      const html = await renderToString(v);
      div.insertAdjacentHTML('beforeend', html);
      code = div.innerText;
      div = null;

      items[filename] = {
        code,
        active,
        hidden,
        readOnly,
      };
    }
  }
  files.value = items;
};

onBeforeMount(() => {
  updateFiles();
});

onMounted(() => {
  theme.value = (document.documentElement.className || 'light') as SandpackThemeProp;

  nextTick(() => {
    setTimeout(() => {
      const target = document.documentElement;
      const mb = new MutationObserver((mutationRecord) => {
        const dom = mutationRecord[0].target as HTMLDivElement;
        console.log(dom.className);
        theme.value = (dom.className || 'light') as SandpackPredefinedTheme;
      });
      mb.observe(target, {
        attributes: true, // 观察node对象的属性
        attributeFilter: ['class'], // 只观察class属性
      });
    });
  });
});
</script>
