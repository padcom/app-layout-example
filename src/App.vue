<template>
  <div class="wrapper" :class="{ 'no-sidebar': noSidebar }">
    <div class="header">This is header (autosize to fit the content)</div>

    <div class="sidebar">
      <div class="ellipsis">This is sidebar (in mobile view it has a max-height)</div>
    </div>

    <div class="content">
      <div class="content-header center">
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
      <div class="content-footer center">This is content footer (fixed size)</div>
    </div>

    <div class="footer">
      This is the main application footer (autosize to fit the content)
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
  '.content-header',
  '.content-main > div',
  '.content-footer',
  '.footer',
)
</script>

<style lang="postcss">
/* Make the entire canvas available to us */
html, body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  font-family: 'Inter';
}

/* This makes sizing of elements predictable */
*, *::before, *::after {
  box-sizing: border-box;
}

/* This is how you customize the scrollbar */
*::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #aaaaaa;
}
*::-webkit-scrollbar-thumb {
  background: black;
}

/* This is the top-level wrapper. It defines the distribution of main elements (header */
.wrapper {
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 17rem 1fr;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';

  @media screen and (max-width: 768px) {
    grid-template-rows: auto auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'sidebar'
      'content'
      'footer';

    /* TODO: Can this be done in grid-template-rows? */
    .sidebar {
      max-height: 6rem;
    }
  }
}

/* This class enables us to hide the sidebar */
.no-sidebar {
  &.wrapper {
    grid-template-rows: auto 1fr auto;
    grid-template-columns: 1fr;
    grid-template-areas:
      'header'
      'content'
      'footer';
  }

  & .sidebar {
    display: none;
  }
}

/* Here we define the basic attributes of main elements of the layout */
.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
  overflow-y: auto;
}

.content {
  grid-area: content;
}

/* The main application footer is allowed to expand to as much content as it has */
.footer {
  grid-area: footer;
}

/* Those are styles for the main application content area - completely disconnected from main layout */
.content {
  /* The main content is also defined with a grid */
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* VERY IMPORTANT: This allows the .content-main to scroll when its content exceeds the available space */
  overflow: hidden;

  /* The content header has a minimum height but it will expand if there is more content */
  > .content-header {
    min-height: 3rem;
  }

  /* The main content will use up all the remaining space and if there is even more content it will enable scrolling */
  > .content-main {
    /* This makes the content area scrollable vertically */
    overflow: hidden auto;
  }

  /* Content footer has a fixed size and if there is too much content it will enable scrolling */
  > .content-footer {
    height: 5rem;
    overflow: auto;
  }
}

/* This is how you center horizontally and vertically in 2023 */
.center {
  display: grid;
  place-items: center;
}

/* This is how we make a too long text end with `...` (ellipsis) */
.ellipsis {
  overflow-x: hidden;
  text-wrap: nowrap;
  text-overflow: ellipsis;
}

/* We're adding a little bit of padding to all containers - just to make it look better */
:root {
  --p-default: 0.5rem;
}

.header,
.sidebar,
.content-header,
.content-main,
.content-footer,
.footer {
  padding: var(--p-default);
  overflow: auto;
}

/* We give here some colors to the elements to make them easier to spot on the screen */
.header {
  background-color: #cbd5e1;
  border-bottom: solid 1px black;
}
.sidebar {
  background-color: #f8b4b4;
  border-right: solid 1px black;

  @media screen and (max-width: 768px) {
    border-right: none;
  }
}
.content {
  background-color: #faca15;
  > .content-header {
    background-color: #acfea4;
  }
  > .content-main {
    background-color: rgb(202 191 253);
  }
  > .content-footer {
    background-color: #ff4545;
  }
}
.footer{
  background-color: #0cff14;
  border-top: solid 1px black;
}
</style>
