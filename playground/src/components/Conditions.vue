<template>
  <div
    id="p-masks-layer"
    :class="[`${visible ? 'slide-in' : ''}`]"
    @click="$emit('on-close')"
  />
  <div id="p-masks-content" :class="[`${visible ? 'slide-in' : ''}`]">
    <div style="padding: 0 24px 22px; margin: 0 auto; max-width: 1192px;">
      <p>Duration</p>
      <div class="py-2 px-6" style="display: flex; flex-wrap: wrap; font-size: 12px;">
        <div>
          <button
            class="c-btn radio"
            style="border: none;"
          >
            Duration:
          </button>
          <input
            v-model="opts.autoClose"
            type="number"
            style="width: 300px;"
          >
        </div>
      </div>

      <p>Icon</p>
      <div class="py-2 px-6" style="display: flex; flex-wrap: wrap; font-size: 12px;">
        <button
          :class="['c-btn radio', { 'active': opts.icon === false }]"
          @click="changeIcon(false)"
        >
          disabled icon
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.icon === undefined }]"
          @click="changeIcon(undefined)"
        >
          unset
        </button>
        <div>
          <button
            class="c-btn radio"
            style="border: none;"
          >
            custom icon:
          </button>
          <input
            v-model="iconVal"
            :class="[{ 'active': opts.icon !== undefined && opts.icon !== false && !!iconVal }]"
            style="width: 300px;"
            placeholder="enter custom icon: string | number"
          >
        </div>
      </div>

      <p>Theme</p>
      <div class="py-2 px-6">
        <button
          :class="['c-btn radio', { 'active': opts.theme === toast.THEME.LIGHT }]"
          @click="changeTheme(toast.THEME.LIGHT)"
        >
          {{ toast.THEME.LIGHT }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.theme === toast.THEME.DARK }]"
          @click="changeTheme(toast.THEME.DARK)"
        >
          {{ toast.THEME.DARK }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.theme === toast.THEME.COLORED }]"
          @click="changeTheme(toast.THEME.COLORED)"
        >
          {{ toast.THEME.COLORED }}
        </button>
      </div>

      <p>Type</p>
      <div class="py-2 px-6">
        <button
          :class="['c-btn radio', { 'active': opts.type === toast.TYPE.DEFAULT }]"
          @click="changeType(toast.TYPE.DEFAULT)"
        >
          {{ toast.TYPE.DEFAULT }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.type === toast.TYPE.SUCCESS }]"
          @click="changeType(toast.TYPE.SUCCESS)"
        >
          {{ toast.TYPE.SUCCESS }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.type === toast.TYPE.WARNING }]"
          @click="changeType(toast.TYPE.WARNING)"
        >
          {{ toast.TYPE.WARNING }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.type === toast.TYPE.ERROR }]"
          @click="changeType(toast.TYPE.ERROR)"
        >
          {{ toast.TYPE.ERROR }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.type === toast.TYPE.INFO }]"
          @click="changeType(toast.TYPE.INFO)"
        >
          {{ toast.TYPE.INFO }}
        </button>
      </div>

      <p>Transition</p>
      <div class="py-2 px-6">
        <button
          :class="['c-btn radio', { 'active': opts.transition === toast.TRANSITIONS.BOUNCE }]"
          @click="changeTransition(toast.TRANSITIONS.BOUNCE)"
        >
          {{ toast.TRANSITIONS.BOUNCE }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.transition === toast.TRANSITIONS.FLIP }]"
          @click="changeTransition(toast.TRANSITIONS.FLIP)"
        >
          {{ toast.TRANSITIONS.FLIP }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.transition === toast.TRANSITIONS.SLIDE }]"
          @click="changeTransition(toast.TRANSITIONS.SLIDE)"
        >
          {{ toast.TRANSITIONS.SLIDE }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.transition === toast.TRANSITIONS.ZOOM }]"
          @click="changeTransition(toast.TRANSITIONS.ZOOM)"
        >
          {{ toast.TRANSITIONS.ZOOM }}
        </button>
      </div>

      <p>Position</p>
      <div class="py-2 px-6">
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.TOP_LEFT }]"
          @click="changePos(toast.POSITION.TOP_LEFT)"
        >
          {{ toast.POSITION.TOP_LEFT }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.TOP_CENTER }]"
          @click="changePos(toast.POSITION.TOP_CENTER)"
        >
          {{ toast.POSITION.TOP_CENTER }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.TOP_RIGHT }]"
          @click="changePos(toast.POSITION.TOP_RIGHT)"
        >
          {{ toast.POSITION.TOP_RIGHT }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.BOTTOM_LEFT }]"
          @click="changePos(toast.POSITION.BOTTOM_LEFT)"
        >
          {{ toast.POSITION.BOTTOM_LEFT }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.BOTTOM_CENTER }]"
          @click="changePos(toast.POSITION.BOTTOM_CENTER)"
        >
          {{ toast.POSITION.BOTTOM_CENTER }}
        </button>
        <button
          :class="['c-btn radio', { 'active': opts.position === toast.POSITION.BOTTOM_RIGHT }]"
          @click="changePos(toast.POSITION.BOTTOM_RIGHT)"
        >
          {{ toast.POSITION.BOTTOM_RIGHT }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watchEffect, type VNode } from 'vue';
import { toast, ToastOptions, ToastPosition, ToastTheme, ToastTransition, ToastType } from 'jerry-todo';

type Icon = string | number | boolean | VNode | undefined;

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: 'on-change', opts: ToastOptions): void;
  (event: 'on-close'): void;
}>();

const opts = reactive({
  icon: undefined as Icon,
  theme: toast.THEME.LIGHT,
  type: toast.TYPE.DEFAULT,
  position: toast.POSITION.TOP_RIGHT,
  autoClose: 3000,
  transition: toast.TRANSITIONS.BOUNCE,
  className: 'foo-bar',
} as ToastOptions);

const iconVal = ref<string | number>('');

const changeType = (value: ToastType) => {
  opts.type = value;

  emit('on-change', opts);
};

const changePos = (value: ToastPosition) => {
  opts.position = value;

  emit('on-change', opts);
};

const changeTransition = (value: ToastTransition) => {
  opts.transition = value;

  emit('on-change', opts);
};

const changeTheme = (value: ToastTheme) => {
  opts.theme = value;

  emit('on-change', opts);
};

const changeIcon = (value: string | number | boolean | VNode | undefined) => {
  opts.icon = value;

  emit('on-change', opts);
};

watchEffect(() => {
  opts.icon = iconVal.value || undefined;

  emit('on-change', opts);
});

watchEffect(() => {
  if (opts.autoClose) {
    emit('on-change', opts);
  }
});
</script>

<style lang="postcss" scoped>
.py-2 {
  padding-top: 0.5rem; /* 8px */
  padding-bottom: 0.5rem; /* 8px */
}

.px-6 {
  padding-left: 1.5rem; /* 24px */
  padding-right: 1.5rem; /* 24px */
}

.c-btn {
  border-width: 1px;
  border-radius: 0.375rem;
  border-color: rgba(253, 253, 253, 1);
  margin-right: 1.25rem;
  padding: 0.5rem;
  font-size: 0.75rem;
  line-height: 1rem;
}

.green {
  background-color: rgba(16, 185, 129, 1);
  color: #fff;
}

.radio {
  background-color: rgba(243, 244, 246, 1);
  color: #333;

  &.active {
    border-color: blue;
    border-style: dashed;
  }
}

input {
  border: 1px #cccc dashed;
  outline: none;
  height: 30px;
  padding: 0 6px !important;
  color: #666 !important;

  &.active {
    border: 1px blue dashed;
  }
}

#p-masks-layer {
  background-color: transparent;
  z-index: -1;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transition: backgroundcolor 0.3s ease-in-out;

  &.slide-in {
    background-color: rgba(33, 33, 33, 0.5);
    z-index: 55;
  }
}

#p-masks-content {
  background-color: #fff;
  z-index: 60;
  width: 76%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  box-sizing: border-box;
  box-shadow: 7px 0 15px rgb(51, 51, 51, 0.48);
  transform: translate3d(-2000px, 0, 0);
  transition: transform 0.3s ease-in-out;

  &.slide-in {
    transform: translate3d(0, 0, 0);
  }
}
</style>
