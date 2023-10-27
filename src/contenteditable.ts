import { onMounted } from 'vue'

export function makeElementsContentEditable(...selectors: string[]) {
  onMounted(() => {
    const elements = document.querySelectorAll(selectors.join(','))
    elements?.forEach(el => { el.setAttribute('contenteditable', 'true') })
  })
}
