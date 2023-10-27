<template>
  <div class="wrapper" :class="{ 'no-sidebar': noSidebar }">
    <div class="header">This is header (autosize to fit the content)</div>

    <div class="sidebar">
      <div v-for="i in 10" :key="i">This is sidebar</div>
    </div>

    <div class="content">
      <div class="content-header center-hv">
        This is content header (autosize to fit the content and with min-height)
      </div>
      <div class="content-main">
        <label>
          Disable sidebar:
          <input v-model="noSidebar" type="checkbox">
        </label>

        <div>This is main content (autosize to fill the available space)</div>
        <div v-for="i in 10" :key="i">Hello, world!</div>
      </div>
      <div class="content-footer center-hv">This is content footer (fixed size)</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { makeElementsContentEditable } from './contenteditable'

const noSidebar = ref(false)

makeElementsContentEditable(
  '.header',
  '.sidebar > div',
  '.footer',
  '.content-header',
  '.content-main > div',
  '.content-footer',
)
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

  @media screen and (max-width: 768px) {
    grid-template: auto auto 1fr auto / 1fr;
  }
}

.header {
  background-color: #cbd5e1;
  grid-column: 1/3;

  @media screen and (max-width: 768px) {
    grid-column: 1/2;
  }
}

.sidebar {
  background-color: #f8b4b4;

  grid-column: 1/2;
  width: 256px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
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
    min-height: 3rem;
  }

  > .content-main {
    background-color: rgb(202 191 253);

    /* This makes the content area scrollable vertically */
    overflow: hidden auto;
  }

  > .content-footer {
    background-color: #ff4545;
    height: 5rem;
  }
}

/* This class enables us to hide the sidebar */
.no-sidebar {
  &.wrapper {
    @media screen and (max-width: 768px) {
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

/* This is how you center horizontally and vertically in 2023 */
.center-hv {
  display: grid;
  place-items: center;
}

/* We're adding a little bit of padding to all containers - just to make it look better */
:root {
  --p-default: 0.5rem;
}

.header,
.sidebar,
.content-header,
.content-main,
.content-footer {
  padding: var(--p-default);
  overflow: auto;
}
</style>
