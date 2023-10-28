import { computed } from 'vue'

const appRootClassList = document.querySelector('#app')?.classList as DOMTokenList

export const noSidebar = computed({
  get: () => appRootClassList.contains('no-sidebar') || false,
  set: value => {
    if (value) appRootClassList.add('no-sidebar')
    else appRootClassList.remove('no-sidebar')
  },
})
