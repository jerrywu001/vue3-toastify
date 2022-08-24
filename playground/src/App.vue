<template>
  <main
    font-sans
    text="gray-700 dark:gray-200"
    relative
  >
    <RouterView v-slot="{ Component }">
      <transition name="page-fade">
        <component
          :is="Component"
          absolute
          left-0
          right-0
          top-25
        />
      </transition>
    </RouterView>
  </main>
</template>
