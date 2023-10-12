<template>
  <div class="header">This is header</div>
  <div class="body">
    <div v-if="sidebar" class="sidebar">
      <p>This is sidebar</p>
      <p>This is sidebar</p>
      <p>This is sidebar</p>
      <p>This is sidebar</p>
      <p>This is sidebar</p>
      <p>This is sidebar</p>
      <p>This is sidebar</p>
    </div>
    <div class="content">
      <div class="content-header">This is content header</div>
      <div class="m-2">
        <input id="sidebar" v-model="sidebar" type="checkbox" class="mr-2">
        <label for="sidebar">Toggle sidebar</label>
      </div>
      <div class="content-main">
        <p>This is main content</p>
        <p v-for="(item, index) in content" :key="index">{{ item }}</p>
      </div>
      <div class="content-footer">This is content footer</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const sidebar = ref(true)
const content = ref([] as string[])
for (let i = 0; i < 100; i++) content.value.push('Hello, world!')
</script>

<style lang="postcss">
html, body {
  @apply h-screen w-screen;
}

.wrapper {
  @apply h-full flex flex-col;
}
</style>

<style lang="postcss" scoped>
.header {
  @apply bg-slate-300;
  @apply h-12;
  @apply shrink-0;
}

.body {
  @apply bg-green-300;
  @apply flex flex-row;
  @apply overflow-hidden;

  @media screen and (max-width: 700px) {
    @apply flex-col;
  }
}

.sidebar {
  @apply bg-red-300;
  @apply w-[256px];
  @apply overflow-y-auto;

  @media screen and (max-width: 700px) {
    @apply w-full max-h-16;
  }
}

.content {
  @apply bg-yellow-300;
  @apply h-full;
  @apply grow flex flex-col;
  /* This allows the .sidebar to occupy vertical space in mobile */
  @apply overflow-hidden;
}

.content-header {
  @apply bg-blue-300;
  @apply h-9;
  @apply shrink-0;
}

.content-main {
  @apply bg-purple-300;
  @apply overflow-y-auto overflow-x-hidden;
}

.content-footer {
  @apply bg-fuchsia-300;
  @apply h-12;
  @apply shrink-0;
}
</style>
