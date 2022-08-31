<template>
  <div ref="codeRef" class="code-group">
    <div class="code-group-wrapper">
      <div class="code-group-tabs">
        <button
          v-for="(label, i) in tabs"
          :key="`${i}${label}`"
          class="code-group-tab xs:py-3 xs:my-0"
          :class="[activeTabIndex === i ? 'active' : 'normal']"
          @click="updateTabs(i)"
        >
          {{ label }}
        </button>
        <span
          ref="highlightUnderline"
          class="code-group-tag"
          :style="{ transform: `scale(0)`, opacity: 0 }"
        >
          <span class="code-group-tag-box" />
        </span>
      </div>
    </div>
    <p><slot /></p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, useSlots, nextTick, onMounted, VNode } from 'vue';

const highlightUnderline = ref();
const activeTabIndex = ref(0);
const codeRef = ref<HTMLDivElement>();
const tabs = ref<string[]>([]);

const slots = useSlots();

function updateHighlightUnderlinePosition() {
  const index = activeTabIndex.value;
  const box = codeRef.value;

  if (box) {
    const btns = box.querySelectorAll('button');
    const activeTab = btns[index];
    highlightUnderline.value.style.left = `${activeTab.offsetLeft}px`;
    highlightUnderline.value.style.top = `${activeTab.offsetTop}px`;
    highlightUnderline.value.style.width = `${activeTab.clientWidth}px`;
    highlightUnderline.value.style.height = `${activeTab.clientHeight}px`;
    highlightUnderline.value.style.transform = 'scale(1)';
    highlightUnderline.value.style.opacity = 1;
  }
}

const getTabName = (className = '') => {
  const attrs = className.split(' ');
  const name = attrs.find(v => v.includes('[')) || '';
  return name;
};

const initTabs = async () => {
  const items: string[] = [];
  const content = (slots.default ? slots.default() : []) as VNode[];
  const codeItems = content.filter((v) => v.type === 'div');

  if (Array.isArray(codeItems)) {
    for (const v of codeItems) {
      const name = getTabName(v.props?.class);
      if (name) {
        items.push(name.substring(1, name.length - 1));
      }
    }
  }
  tabs.value = items;
};

// @ts-ignore
const slotBoxs = computed(() => slots.default().filter((v) => v.type === 'div'));

function updateTabs(index = 0) {
  activeTabIndex.value = index;
  if (codeRef.value) {
    const boxs = codeRef.value.querySelectorAll('div[class*="language-"]');
    if (boxs) {
      boxs.forEach((element, idx) => {
        (element as HTMLDivElement).style.display = idx === index ? 'block' : 'none';
      });
    }
    nextTick(() => updateHighlightUnderlinePosition());
  }
}

initTabs();

onMounted(() => {
  nextTick(() => {
    updateHighlightUnderlinePosition();
  });
});
</script>

<style lang="scss">
.code-group {
  margin-top: 1rem;
  margin-bottom: 1rem;

  div[class*='language-'] {
    display: none;
    width: 100%;
    margin: 0 auto !important;
    position: relative;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    background-color: rgba(43, 47, 77, 0.93);

    & > button.copy {
      background-color: transparent;
    }

    &:first-child {
      display: block;
    }
  }

  &-tag {
    position: absolute;
    transition: left 150ms, top 150ms, width 150ms, height 150ms, transform 100ms,
      opacity 100ms;
    z-index: -1;

    &-box {
      border-radius: 0.5rem;
      display: flex;
      height: 100%;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.84);
    }
  }

  &-tabs {
    width: max-content;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    position: relative;
    z-index: 0;
  }

  &-tab {
    border-radius: 8px;
    font-weight: 500;
    margin-top: 0.375rem;
    margin-bottom: 0.375rem;
    font-size: 0.875rem;
    line-height: 1.25rem;
    letter-spacing: -0.025em;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
    position: relative;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
    display: inline-block;

    &.normal {
      color: rgba(255, 255, 255, 0.8);
    }

    &.active {
      color: rgba(31, 41, 55, 1);
    }

    &:focus {
      outline: 2px solid transparent;
      outline-offset: 2px;
    }
  }

  &-wrapper {
    color: #fff;
    position: relative;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    overflow-x: auto;
    background-color: #32354f;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  p {
    margin: 0;
  }
}

.dark {
  .code-group {
    div[class*='language-'] {
      background-color: rgba(43, 47, 77, 0.63);

      & > button.copy {
        background-color: rgba(18, 12, 12, 0.24);
      }
    }

    &-wrapper {
      background-color: rgb(47 49 65);
    }

    &-tag {
      &-box {
        background-color: rgba(109, 113, 148, 0.5);
      }
    }

    &-tab {
      &.normal {
        color: #d7d8d9;
      }

      &.active {
        color: #fff;
      }

      &:focus {
        outline: 2px solid transparent;
        outline-offset: 2px;
      }
    }
  }
}
</style>
