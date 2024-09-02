<template>
  <div class="flex-modal">
    <div>
      <div class="breadcrumb">
        🎨&nbsp;&nbsp;/&nbsp;&nbsp;Theme
      </div>
      <div class="options-box">
        <Select
          v-model:value="opts.theme"
          :style="{ width: '130px' }"
          @change="(val) => { changeTheme(val as ToastTheme); }"
        >
          <SelectOption :value="toast.THEME.AUTO">
            {{ toast.THEME.AUTO }}
          </SelectOption>
          <SelectOption :value="toast.THEME.LIGHT">
            {{ toast.THEME.LIGHT }}
          </SelectOption>
          <SelectOption :value="toast.THEME.DARK">
            {{ toast.THEME.DARK }}
          </SelectOption>
          <SelectOption :value="toast.THEME.COLORED">
            {{ toast.THEME.COLORED }}
          </SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <div class="breadcrumb">
        💡&nbsp;&nbsp;/&nbsp;&nbsp;Type
      </div>
      <div class="options-box">
        <Select
          v-model:value="opts.type"
          :style="{ width: '130px' }"
          @change="(val) => { changeType(val as ToastType); }"
        >
          <SelectOption :value="toast.TYPE.DEFAULT">
            {{ toast.TYPE.DEFAULT }}
          </SelectOption>
          <SelectOption :value="toast.TYPE.INFO">
            {{ toast.TYPE.INFO }}
          </SelectOption>
          <SelectOption :value="toast.TYPE.SUCCESS">
            {{ toast.TYPE.SUCCESS }}
          </SelectOption>
          <SelectOption :value="toast.TYPE.WARNING">
            {{ toast.TYPE.WARNING }}
          </SelectOption>
          <SelectOption :value="toast.TYPE.ERROR">
            {{ toast.TYPE.ERROR }}
          </SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <div class="breadcrumb">
        📡&nbsp;&nbsp;/&nbsp;&nbsp;Position
      </div>
      <div class="options-box">
        <Select
          v-model:value="opts.position"
          :style="{ width: '130px' }"
          @change="(val) => { changePos(val as ToastPosition); }"
        >
          <SelectOption :value="toast.POSITION.TOP_LEFT">
            {{ toast.POSITION.TOP_LEFT }}
          </SelectOption>
          <SelectOption :value="toast.POSITION.TOP_CENTER">
            {{ toast.POSITION.TOP_CENTER }}
          </SelectOption>
          <SelectOption :value="toast.POSITION.TOP_RIGHT">
            {{ toast.POSITION.TOP_RIGHT }}
          </SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_LEFT">
            {{ toast.POSITION.BOTTOM_LEFT }}
          </SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_CENTER">
            {{ toast.POSITION.BOTTOM_CENTER }}
          </SelectOption>
          <SelectOption :value="toast.POSITION.BOTTOM_RIGHT">
            {{ toast.POSITION.BOTTOM_RIGHT }}
          </SelectOption>
        </Select>
      </div>
    </div>

    <div>
      <div class="breadcrumb">
        🎉&nbsp;&nbsp;/&nbsp;&nbsp;Transition
      </div>
      <div class="options-box">
        <Select
          v-model:value="opts.transition"
          :style="{ width: '130px' }"
          @change="(val) => { changeTransition(val as ToastTransition); }"
        >
          <SelectOption :value="toast.TRANSITIONS.BOUNCE">
            {{ toast.TRANSITIONS.BOUNCE }}
          </SelectOption>
          <SelectOption :value="toast.TRANSITIONS.FLIP">
            {{ toast.TRANSITIONS.FLIP }}
          </SelectOption>
          <SelectOption :value="toast.TRANSITIONS.SLIDE">
            {{ toast.TRANSITIONS.SLIDE }}
          </SelectOption>
          <SelectOption :value="toast.TRANSITIONS.ZOOM">
            {{ toast.TRANSITIONS.ZOOM }}
          </SelectOption>
        </Select>
      </div>
    </div>
  </div>

  <Divider orientation="left">
    Other Props
  </Divider>

  <div class="others">
    <div class="others-box">
      <div>
        <span>Autoclose Duration: </span>
        <div class="options-box">
          <Input
            v-model:value="opts.autoClose"
            type="number"
            placeholder="empty to be false"
          />
        </div>
        <span>ms</span>
      </div>
      <div>
        <span>Progress: </span>
        <div class="options-box">
          <Input
            v-model:value="opts.progress"
            type="number"
            placeholder="0 to 1"
          />
        </div>
      </div>
    </div>

    <div class="others-box">
      <div>
        <Checkbox
          :checked="multiple === true"
          @change="() => {
            multiple = !multiple;
            updateGlobalOptions({ multiple });
          }"
        >
          support multiple
        </Checkbox>
      </div>
      <div v-if="multiple">
        <span title="will not take effect when multiple: false">Limit: </span>
        <div class="options-box">
          <Input
            v-model:value="limit"
            title="will not take effect when multiple: false"
            type="number"
            :disabled="!multiple"
          />
        </div>
      </div>
      <div v-if="!multiple">
        <span>Limit: </span>
        <div class="options-box">
          <Input
            style="width: 238px;"
            disabled
            value="no effect when multiple set false"
          />
        </div>
      </div>
      <div>
        <Checkbox
          :checked="dangerouslyHTMLString === true"
          @change="() => {
            dangerouslyHTMLString = !dangerouslyHTMLString;
            updateGlobalOptions({ dangerouslyHTMLString });
          }"
        >
          <span style="color: red;">dangerously html string (default: false)</span>
        </Checkbox>
      </div>
      <div>
        <Checkbox v-model:checked="opts.hideProgressBar">
          Hide progress bar(less fanciness!)
        </Checkbox>
      </div>
      <div>
        <Checkbox
          :checked="opts.autoClose === false"
          @change="() => {
            opts.autoClose = opts.autoClose === false ? 3000 : false;
          }"
        >
          Disable auto-close
        </Checkbox>
      </div>
      <div>
        <Checkbox v-model:checked="opts.closeOnClick">
          Close on click
        </Checkbox>
      </div>
      <div>
        <Checkbox v-model:checked="opts.rtl">
          Right to left layout
        </Checkbox>
      </div>
      <div>
        <Checkbox v-model:checked="opts.pauseOnHover">
          Pause on hover
        </Checkbox>
      </div>
      <div>
        <Checkbox v-model:checked="opts.pauseOnFocusLoss">
          Pause toast when the window loses focus
        </Checkbox>
      </div>
      <div>
        <Checkbox
          :checked="newestOnTop === true"
          @change="() => {
            newestOnTop = !newestOnTop;
            updateGlobalOptions({ newestOnTop });
          }"
        >
          Newest on top* (play nice with bottom toast)
        </Checkbox>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Divider, Input, Select, SelectOption, Checkbox } from 'ant-design-vue';
import { reactive, ref, watchEffect, watch, type VNode } from 'vue';
import { toast, updateGlobalOptions, ToastOptions, ToastPosition, ToastTheme, ToastTransition, ToastType } from 'vue3-toastify';
import 'ant-design-vue/es/input/style/index.css';
import 'ant-design-vue/es/divider/style/index.css';
import 'ant-design-vue/es/select/style/index.css';
import 'ant-design-vue/es/checkbox/style/index.css';

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

const limit = ref<number>(0);
const newestOnTop = ref(false);
const multiple = ref(true);
const dangerouslyHTMLString = ref(true);
const progress = ref<number | undefined>(undefined);
const iconVal = ref<string | number>('');

const opts = reactive({
  icon: undefined as Icon,
  theme: toast.THEME.AUTO,
  type: toast.TYPE.DEFAULT,
  position: toast.POSITION.TOP_RIGHT,
  closeOnClick: true,
  pauseOnHover: true,
  rtl: false,
  pauseOnFocusLoss: true,
  autoClose: 3000 as any,
  hideProgressBar: false,
  progress: progress.value as number,
  transition: toast.TRANSITIONS.BOUNCE,
  dangerouslyHTMLString,
});

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
    opts.autoClose = Number(opts.autoClose);
    emit('on-change', opts);
  }
});

watch(() => limit.value, () => {
  updateGlobalOptions({ limit: isNaN(Number(limit.value)) ? 0 : Number(limit.value) });
});
</script>

<style lang="postcss" scoped>
.others-box {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
  max-width: 930px;

  & > div {
    display: flex;
    align-items: center;
    margin-right: 16px;
    margin-bottom: 8px;
    width: 398px;
    user-select: none;

    .ant-input {
      width: 100px;
      margin: 0 12px;
    }
  }
}

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

.breadcrumb {
  font-size: 14px;
  margin-bottom: 8px;
}

.ant-input {
  margin-right: 8px !important;
}

html.dark {
  .ant-divider-horizontal.ant-divider-with-text {
    color: #fff;
    border-color: #8a8989;
  }

  .ant-input {
    background-color: transparent;
    border-color: #5672cd;
    color: #fff;
  }

  .ant-checkbox-wrapper {
    color: #fff;
  }

  .breadcrumb {
    color: #fff;
  }
}

</style>
