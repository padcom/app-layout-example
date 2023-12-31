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
/* This makes sizing of elements predictable */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Reset sizes of everything */
* {
  margin: 0;
  padding: 0;
  font: inherit;
}

/* Remove list styles on ul, ol elements with a role of "list" */
ul[role="list"],
ol[role="list"] {
  list-style: none;
}

/* Set core root defaults */
html:focus-within {
  scroll-behavior: smooth;
}

/* Set core body defaults */
body {
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

/* A elements that don't have a class get default styles */
a:not([class]) {
  text-decoration-skip-ink: auto;
}

/* Make images easier to work with */
img,
picture,
svg {
  max-width: 100%;
  display: block;
}

/* Remove all animations, transitions and smooth scroll for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  html:focus-within {
   scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* Make the entire canvas available to us. Since this is an application layout */
/* we don't need to worry about scrolling and the whole thing should fill up */
/* the page all the time */
html, body {
  height: 100dvh;
  width: 100dvw;
}

/* This is the top-level application layout. */
/* It defines the distribution of main elements (header, sidebar, content and footer) */
.app-layout {
  /* There is a way to not set the height here and use the body's size automatically */
  /* html, body { display: grid } */
  /* It works because a grid automatically expands not only horizontally but also vertically */
  height: 100%;

  display: grid;
  grid-template-columns: minmax(17rem, 0.3fr) 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header header'
    'sidebar content'
    'footer footer';

  @media screen and (max-width: 666px) {
    grid-template-columns: 1fr;
    /* In mobile view limit the height of the sidebar so it doesn't take all the available space */
    grid-template-rows: auto fit-content(6rem) 1fr auto;
    grid-template-areas:
      'header'
      'sidebar'
      'content'
      'footer';

    /* This is an alternative way to specify max height of the sidebar in mobile view. */
    /* In this case the row height `fit-content(6rem)` would be changed to `auto`. */
    /*
    > .sidebar {
      max-height: 6rem;
    }
    */
  }

  /* Here we define the basic attributes of main elements of the layout */
  > .header {
    grid-area: header;
  }

  > .sidebar {
    grid-area: sidebar;
    overflow-y: auto;
  }

  > .content {
    grid-area: content;
    container-type: inline-size;
  }

  > .footer {
    grid-area: footer;
    max-height: 7rem;
    overflow-y: auto;
  }

  /* This class enables us to hide the sidebar */
  &.no-sidebar {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header'
      'content'
      'footer';

    > .sidebar {
      display: none;
    }
  }
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
  white-space: nowrap;
  text-overflow: ellipsis;
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
.content-header {
  background-color: #acfea4;
}
.content-main {
  background-color: #cabffd;
  border-block: solid 1px #df00a7;
}
.content-footer {
  background-color: #ffbc7e;
}
.footer{
  background-color: #f9b3ff;
  border-top: solid 1px black;
}
</style>
