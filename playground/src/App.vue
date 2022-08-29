<template>
  <main class="relative">
    <RouterView v-slot="{ Component }">
      <transition name="page-fade">
        <component :is="Component" />
      </transition>
    </RouterView>
  </main>
</template>
