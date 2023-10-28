<template>
  <div class="header">This is header (autosize to fit the content)</div>

  <div class="sidebar">
    <div class="ellipsis">This is sidebar (in mobile view it has a max-height)</div>
  </div>

  <div class="content">
    <div class="content-header center">
      This is content header (autosize to fit the content and with min-height and max-height)
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
    This is the main application footer (autosize to fit the content and with max-height)
  </div>
</template>

<script lang="ts" setup>
import { makeElementsContentEditable } from './contenteditable'
import { noSidebar } from './no-sidebar'

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
  height: 100dvh;
  width: 100dvw;
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
  background-color: #ffffff;
}
*::-webkit-scrollbar-thumb {
  background: #666;
}

/* This is the top-level application layout. */
/* It defines the distribution of main elements (header, sidebar, content and footer) */
.app-layout {
  height: 100%;

  display: grid;
  grid-template-columns: 17rem 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';

  @media screen and (max-width: 666px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto;
    grid-template-areas:
      'header'
      'sidebar'
      'content'
      'footer';

    /* In mobile view limit the height of the sidebar so it doesn't take all the available space */
    .sidebar {
      max-height: 6rem;
    }
  }
}

/* This class enables us to hide the sidebar */
.no-sidebar {
  & .sidebar {
    display: none;
  }

  &.app-layout {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'content'
      'footer';
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
  max-height: 7rem;
  overflow-y: auto;
}

/* Those are styles for the main application content area - completely disconnected from main layout */
.content {
  /* The main content is also defined with a grid */
  display: grid;
  grid-template-rows: auto 1fr auto;

  /* The content header has a minimum and maximum height but it will expand if there is more content */
  > .content-header {
    min-height: 3rem;
    max-height: 7rem;
    overflow-y: auto;
  }

  /* VERY IMPORTANT: This allows the .content-main to scroll when its content exceeds the available space */
  overflow: hidden;

  /* The main content will use up all the remaining space and if there is even more content it will enable scrolling */
  > .content-main {
    /* This makes the content area scrollable vertically */
    overflow: hidden auto;
  }

  /* Content footer has a fixed size and if there is too much content it will enable scrolling */
  > .content-footer {
    height: 5rem;
    overflow-y: auto;
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
}

/* We give here some colors to the elements to make them easier to spot on the screen */
.header {
  background-color: #cbd5e1;
  border-bottom: solid 1px black;
}
.sidebar {
  background-color: #f8b4b4;
  border-right: solid 1px black;

  @media screen and (max-width: 666px) {
    border-right: none;
    border-bottom: solid 1px black;
  }
}
.content {
  background-color: #faca15;
  > .content-header {
    background-color: #acfea4;
  }
  > .content-main {
    background-color: #cabffd;
    border-block: solid 1px #df00a7;
  }
  > .content-footer {
    background-color: #ffbc7e;
  }
}
.footer{
  background-color: #f9b3ff;
  border-top: solid 1px black;
}
</style>
