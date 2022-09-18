<template>
  <div class="flex-modal">
    <div>
      <Breadcrumb>
        <BreadcrumbItem>🏠</BreadcrumbItem>
        <BreadcrumbItem>Theme</BreadcrumbItem>
      </Breadcrumb>
      <div class="options-box">
        <Select
          v-model:value="opts.theme"
          :style="{ width: '120px' }"
          @change="(val) => { changeTheme(val as ToastTheme); }"
        >
          <SelectOption :value="toast.THEME.LIGHT">{{ toast.THEME.LIGHT }}</SelectOption>
          <SelectOption :value="toast.THEME.DARK">{{ toast.THEME.DARK }}</SelectOption>
          <SelectOption :value="toast.THEME.COLORED">{{ toast.THEME.COLORED }}</SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <Breadcrumb>
        <BreadcrumbItem>⛱</BreadcrumbItem>
        <BreadcrumbItem>Type</BreadcrumbItem>
      </Breadcrumb>
      <div class="options-box">
        <Select
          v-model:value="opts.type"
          :style="{ width: '120px' }"
          @change="(val) => { changeType(val as ToastType); }"
        >
          <SelectOption :value="toast.TYPE.DEFAULT">{{ toast.TYPE.DEFAULT }}</SelectOption>
          <SelectOption :value="toast.TYPE.INFO">{{ toast.TYPE.INFO }}</SelectOption>
          <SelectOption :value="toast.TYPE.SUCCESS">{{ toast.TYPE.SUCCESS }}</SelectOption>
          <SelectOption :value="toast.TYPE.WARNING">{{ toast.TYPE.WARNING }}</SelectOption>
          <SelectOption :value="toast.TYPE.ERROR">{{ toast.TYPE.ERROR }}</SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <Breadcrumb>
        <BreadcrumbItem>🚀</BreadcrumbItem>
        <BreadcrumbItem>Transition</BreadcrumbItem>
      </Breadcrumb>
      <div class="options-box">
        <Select
          v-model:value="opts.transition"
          :style="{ width: '120px' }"
          @change="(val) => { changeTransition(val as ToastTransition); }"
        >
          <SelectOption :value="toast.TRANSITIONS.BOUNCE">{{ toast.TRANSITIONS.BOUNCE }}</SelectOption>
          <SelectOption :value="toast.TRANSITIONS.FLIP">{{ toast.TRANSITIONS.FLIP }}</SelectOption>
          <SelectOption :value="toast.TRANSITIONS.SLIDE">{{ toast.TRANSITIONS.SLIDE }}</SelectOption>
          <SelectOption :value="toast.TRANSITIONS.ZOOM">{{ toast.TRANSITIONS.ZOOM }}</SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <Breadcrumb>
        <BreadcrumbItem>🚘</BreadcrumbItem>
        <BreadcrumbItem>Position</BreadcrumbItem>
      </Breadcrumb>
      <div class="options-box">
        <Select
          v-model:value="opts.position"
          :style="{ width: '120px' }"
          @change="(val) => { changePos(val as ToastPosition); }"
        >
          <SelectOption :value="toast.POSITION.TOP_LEFT">{{ toast.POSITION.TOP_LEFT }}</SelectOption>
          <SelectOption :value="toast.POSITION.TOP_CENTER">{{ toast.POSITION.TOP_CENTER }}</SelectOption>
          <SelectOption :value="toast.POSITION.TOP_RIGHT">{{ toast.POSITION.TOP_RIGHT }}</SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_LEFT">{{ toast.POSITION.BOTTOM_LEFT }}</SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_CENTER">{{ toast.POSITION.BOTTOM_CENTER }}</SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_RIGHT">{{ toast.POSITION.BOTTOM_RIGHT }}</SelectOption>
        </Select>
      </div>
    </div>
  </div>

  <Divider>Other Props</Divider>

  <div class="others">
    <Breadcrumb>
      <BreadcrumbItem>🏖</BreadcrumbItem>
      <BreadcrumbItem>Autoclose Delay</BreadcrumbItem>
    </Breadcrumb>
    <div class="options-box">
      <Input
        v-model:value="opts.autoClose"
        :style="{ width: '200px' }"
        type="number"
        placeholder="empty to be false"
      />ms
    </div>
  </div>
</template>

<script setup lang="ts">
import { Divider, Input, Breadcrumb, BreadcrumbItem, Select, SelectOption } from 'ant-design-vue';
import { reactive, ref, watchEffect, type VNode } from 'vue';
import { toast, ToastOptions, ToastPosition, ToastTheme, ToastTransition, ToastType } from 'vue3-toastify';
import 'ant-design-vue/es/input/style/index.css';
import 'ant-design-vue/es/divider/style/index.css';
import 'ant-design-vue/es/breadcrumb/style/index.css';
import 'ant-design-vue/es/select/style/index.css';

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
});

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

// const changeIcon = (value: string | number | boolean | VNode | undefined) => {
//   opts.icon = value;

//   emit('on-change', opts);
// };

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
.options-box {
  display: flex;
  flex-wrap: wrap;
}

.flex-modal {
  display: flex;
  flex-wrap: wrap;

  & > div {
    flex-direction: column;
    margin-right: 32px;
    margin-bottom: 12px;
  }
}

.ant-breadcrumb {
  margin-bottom: 8px;
}

html.dark {
  .ant-divider-horizontal.ant-divider-with-text {
    color: #fff;
    border-color: #8a8989;
  }

  .ant-breadcrumb,
  .ant-breadcrumb-link,
  .ant-breadcrumb-separator,
  .ant-breadcrumb > span:first-child,
  .ant-breadcrumb > span:last-child,
  .ant-breadcrumb > span:last-child a {
    color: #fff !important;
  }
}

</style>
