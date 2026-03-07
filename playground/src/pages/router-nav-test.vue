<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { toast, updateGlobalOptions } from 'vue3-toastify';

const router = useRouter();
const route = useRoute();
const clearOnUrlChange = ref(true);

const currentPath = computed(() => route.fullPath);

function applyGlobalOption() {
  updateGlobalOptions({ clearOnUrlChange: clearOnUrlChange.value });
}

function emitToast() {
  toast(
    `[router-test] step=${route.query.step || 0}`,
    { autoClose: true },
  );
}

function pushNext() {
  const step = Number(route.query.step || 0) + 1;

  router.push({
    path: '/router-nav-test',
    query: {
      step: String(step),
      t: String(Date.now()),
    },
  });
}

function goBack() {
  router.back();
}

function goMinusOne() {
  router.go(-1);
}

function clearAllToast() {
  toast.clearAll(undefined, false);
}

onMounted(() => {
  applyGlobalOption();
});
</script>

<template>
  <div class="router-nav-test">
    <h2>Router Navigation Test</h2>
    <p>Current URL: <code>{{ currentPath }}</code></p>

    <div class="row">
      <label for="clear-on-url-change">
        <input
          id="clear-on-url-change"
          v-model="clearOnUrlChange"
          type="checkbox"
          @change="applyGlobalOption"
        >
        clearOnUrlChange
      </label>
    </div>

    <div class="row button-group">
      <button class="btn" @click="emitToast">
        Emit toast
      </button>
      <button class="btn" @click="pushNext">
        router.push
      </button>
      <button class="btn" @click="goBack">
        router.back
      </button>
      <button class="btn" @click="goMinusOne">
        router.go(-1)
      </button>
      <button class="btn danger" @click="clearAllToast">
        clear all toast
      </button>
    </div>

    <div class="row tips">
      <p>Manual check:</p>
      <p>1. Uncheck clearOnUrlChange, emit a toast, then run push/back/go(-1): toast should stay.</p>
      <p>2. Check clearOnUrlChange, emit a toast, then run push/back/go(-1): toast should clear.</p>
    </div>

    <div class="row">
      <RouterLink to="/">
        Back to playground home
      </RouterLink>
    </div>
  </div>
</template>

<style lang="postcss">
.router-nav-test {
  padding: 20px;
}

.router-nav-test .row {
  margin-bottom: 14px;
}

.router-nav-test .button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.router-nav-test .btn {
  color: #fff;
  border-color: #5672cd;
  background-color: #5672cd;
  border-radius: 16px;
  padding: 5px 14px;
}

.router-nav-test .btn:hover {
  border-color: #2e4388;
  background-color: #2e4388;
}

.router-nav-test .btn.danger {
  border-color: #c92929;
  background-color: #c92929;
}

.router-nav-test .tips p {
  margin: 6px 0;
}

html.dark {
  .router-nav-test {
    color: #f3f5f8;
  }

  .router-nav-test code {
    color: #d7e3ff;
    background: rgb(255, 255, 255, 0.12);
    border-radius: 4px;
    padding: 2px 6px;
  }

  .router-nav-test a {
    color: #87b2ff;
  }
}
</style>
