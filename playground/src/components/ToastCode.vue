<template>
  <div class="code-container">
    <pre>
      <code class="language-javascript" v-html="highlightedCode"></code>
    </pre>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

hljs.registerLanguage('javascript', javascript);

const props = defineProps({
  options: {
    type: Object,
    required: true
  }
});

const defaultOptions = {
  dangerouslyHTMLString: false,
  multiple: true,
  position: "top-right",
  autoClose: 3000,
  transition: 'bounce',
  hideProgressBar: false,
  pauseOnHover: true,
  pauseOnFocusLoss: true,
  closeOnClick: true,
  rtl: false,
  role: 'alert',
  theme: 'light',
}

const highlightedCode = ref('');

const highlightCode = (options) => {
  const code = `
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

toast("Hello! Wow so easy!", ${JSON.stringify(options, (key, value) => {
    //only return the value if it's different from the default
  if (value !== defaultOptions[key]) {
      return value;
    }
  }, 2)})`;
  const highlighted = hljs.highlight(code, {language:'javascript'}).value;
  highlightedCode.value = highlighted;
};

onMounted(() => {
  highlightCode(props.options);
});

watch(() => ({ ...props.options }), (newOptions) => {
  highlightCode(newOptions);
}, { deep: true });
</script>

<style>
.code-container {
  font-family: Hack, monospace;
  border-radius: 5px;
  box-shadow: 0 20px 68px rgba(0, 0, 0, 0.55);
  position: relative;
  padding: 0 12px;
  background-color: #292d3e;
  overflow-x: auto;
  transition: background-color .5s;
  color: #CFD2D1 !important;
  background-color: #151718 !important;
  font-size: 14px;
  font-style: normal;
  font-variant-ligatures: contextual;
  font-weight: 400;
  letter-spacing: normal;
  line-height: 18.6167px
}
pre{
  margin: 0;
}

.hljs-keyword {
  color: #c586c0;
}

.hljs-string {
  color: #ce9178;
}

</style>
