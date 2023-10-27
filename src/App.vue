<template>
  <div class="wrapper" :class="{ 'no-sidebar': noSidebar }">
    <div class="header">This is header</div>

    <div class="sidebar">
      <p v-for="i in 10" :key="i">This is sidebar</p>
    </div>

    <div class="content">
      <div class="content-header center-hv">This is content header</div>
      <div class="content-main">
        <label>
          Disable sidebar:
          <input v-model="noSidebar" type="checkbox">
        </label>

        <p>This is main content</p>
        <p v-for="i in 10" :key="i">Hello, world!</p>
      </div>
      <div class="content-footer center-hv">This is content footer</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const noSidebar = ref(false)
</script>

<style lang="postcss">
*, *::before, *::after {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

.wrapper {
  height: 100vh;
  display: grid;
  grid-template: auto 1fr / auto 1fr;

  @media screen and (max-width: 700px) {
    grid-template: auto auto 1fr auto / 1fr;
  }
}

.header {
  background-color: #cbd5e1;
  grid-column: 1/3;

  @media screen and (max-width: 700px) {
    grid-column: 1/2;
  }
}

.sidebar {
  background-color: #f8b4b4;

  grid-column: 1/2;
  width: 256px;
  overflow-y: auto;

  @media screen and (max-width: 700px) {
    grid-rows: 2/3;
    width: 100%;
    max-height: 4rem;
  }
}

.content {
  background-color: #faca15;

  display: grid;
  grid-template-rows: auto 1fr auto;

  /* This allows the .sidebar to occupy vertical space in mobile */
  overflow: hidden;

  > .content-header {
    background-color: #acfea4;
    height: 2.25rem;
  }

  > .content-main {
    height: 100%;
    background-color: rgb(202 191 253);

    /* This makes the content area scrollable vertically */
    overflow: hidden auto;
  }

  > .content-footer {
    background-color: #ff4545;
    height: 5rem;
  }
}

.no-sidebar {
  &.wrapper {
    @media screen and (max-width: 700px) {
      grid-template: auto 1fr auto / 1fr;
    }
  }
  .sidebar {
    display: none;
  }
  .content {
    grid-column: 1/3;
  }
}

.center-hv {
  display: grid;
  place-items: center;
}
</style>
