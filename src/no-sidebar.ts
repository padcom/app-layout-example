import { computed } from 'vue'

const appRootClasses = document.querySelector('#app')?.classList as DOMTokenList

export const noSidebar = computed({
  get: () => appRootClasses.contains('no-sidebar') || false,
  set: value => {
    if (value) appRootClasses.add('no-sidebar')
    else appRootClasses.remove('no-sidebar')
  },
})
