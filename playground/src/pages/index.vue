<script setup lang="ts">
import { ref, watchEffect, type VNode } from 'vue';
import { useRouter } from 'vue-router';
import { toast, ToastPosition, ToastTheme, ToastType } from 'vue3-toastify';

const iconVal = ref<string | number>('');
const icon = ref<string | number | boolean | VNode | undefined>(undefined);
const type = ref<ToastType>(toast.TYPE.DEFAULT);
const pos = ref<ToastPosition>(toast.POSITION.TOP_RIGHT);
const theme = ref<ToastTheme>(toast.THEME.LIGHT);

function showToast() {
  toast.success('Wow so easy!', {
    icon: icon.value,
    theme: theme.value,
    type: type.value,
    position: pos.value,
    autoClose: 2000,
    style: { userSelect: 'none' },
  });
}

function showLoadToast() {
  toast.loading('Wow so easy!', {
    icon: icon.value,
    theme: theme.value,
    type: type.value,
    position: pos.value,
    autoClose: 2000,
    style: { userSelect: 'none' },
  });
}

const router = useRouter();

const toAbout = () => {
  router.push('/about');
};

const changeType = (value: ToastType) => {
  type.value = value;
};

const changePos = (value: ToastPosition) => {
  pos.value = value;
};

const changeTheme = (value: ToastTheme) => {
  theme.value = value;
};

const changeIcon = (value: string | number | boolean | VNode | undefined) => {
  icon.value = value;
};

watchEffect(() => {
  icon.value = iconVal.value || undefined;
});
</script>

<template>
  <div style="padding: 0 24px 22px; margin: 0 auto; max-width: 1192px;">
    <p>Icon</p>
    <div class="py-2 px-6" style="display: flex; font-size: 12px;">
      <button
        :class="['c-btn radio', { 'active': icon === false }]"
        @click="changeIcon(false)"
      >
        disabled icon
      </button>
      <button
        :class="['c-btn radio', { 'active': icon === undefined }]"
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
          :class="[{ 'active': icon !== undefined && icon !== false && !!iconVal }]"
          style="width: 300px;"
          placeholder="enter custom icon: string | number"
        >
      </div>
    </div>

    <p>Theme</p>
    <div class="py-2 px-6">
      <button
        :class="['c-btn radio', { 'active': theme === toast.THEME.LIGHT }]"
        @click="changeTheme(toast.THEME.LIGHT)"
      >
        {{ toast.THEME.LIGHT }}
      </button>
      <button
        :class="['c-btn radio', { 'active': theme === toast.THEME.DARK }]"
        @click="changeTheme(toast.THEME.DARK)"
      >
        {{ toast.THEME.DARK }}
      </button>
      <button
        :class="['c-btn radio', { 'active': theme === toast.THEME.COLORED }]"
        @click="changeTheme(toast.THEME.COLORED)"
      >
        {{ toast.THEME.COLORED }}
      </button>
    </div>

    <p>Type</p>
    <div class="py-2 px-6">
      <button
        :class="['c-btn radio', { 'active': type === toast.TYPE.DEFAULT }]"
        @click="changeType(toast.TYPE.DEFAULT)"
      >
        {{ toast.TYPE.DEFAULT }}
      </button>
      <button
        :class="['c-btn radio', { 'active': type === toast.TYPE.SUCCESS }]"
        @click="changeType(toast.TYPE.SUCCESS)"
      >
        {{ toast.TYPE.SUCCESS }}
      </button>
      <button
        :class="['c-btn radio', { 'active': type === toast.TYPE.WARNING }]"
        @click="changeType(toast.TYPE.WARNING)"
      >
        {{ toast.TYPE.WARNING }}
      </button>
      <button
        :class="['c-btn radio', { 'active': type === toast.TYPE.ERROR }]"
        @click="changeType(toast.TYPE.ERROR)"
      >
        {{ toast.TYPE.ERROR }}
      </button>
      <button
        :class="['c-btn radio', { 'active': type === toast.TYPE.INFO }]"
        @click="changeType(toast.TYPE.INFO)"
      >
        {{ toast.TYPE.INFO }}
      </button>
    </div>

    <p>Position</p>
    <div class="py-2 px-6">
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.TOP_LEFT }]"
        @click="changePos(toast.POSITION.TOP_LEFT)"
      >
        {{ toast.POSITION.TOP_LEFT }}
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.TOP_CENTER }]"
        @click="changePos(toast.POSITION.TOP_CENTER)"
      >
        {{ toast.POSITION.TOP_CENTER }}
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.TOP_RIGHT }]"
        @click="changePos(toast.POSITION.TOP_RIGHT)"
      >
        {{ toast.POSITION.TOP_RIGHT }}
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.BOTTOM_LEFT }]"
        @click="changePos(toast.POSITION.BOTTOM_LEFT)"
      >
        {{ toast.POSITION.BOTTOM_LEFT }}
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.BOTTOM_CENTER }]"
        @click="changePos(toast.POSITION.BOTTOM_CENTER)"
      >
        {{ toast.POSITION.BOTTOM_CENTER }}
      </button>
      <button
        :class="['c-btn radio', { 'active': pos === toast.POSITION.BOTTOM_RIGHT }]"
        @click="changePos(toast.POSITION.BOTTOM_RIGHT)"
      >
        {{ toast.POSITION.BOTTOM_RIGHT }}
      </button>
    </div>
    <br>

    <div class="py-2 px-6" style="display: flex;">
      <button class="c-btn green" @click="showToast">💡 show toast</button>
      <button class="c-btn green" @click="showLoadToast">💡 show loading toast</button>
      <button class="c-btn green" @click="toAbout">🚀 to about</button>
    </div>
  </div>
</template>

<style lang="postcss">
.c-btn {
  @apply rounded-md border border-light-50 mr-5 p-2 text-xs;
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
</style>
