import { onMounted, onUnmounted, type Ref } from 'vue'

const useClickOutSide = (
  eleRef: Ref<HTMLElement | null>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (eleRef.value && e.target) {
      if (!eleRef.value.contains(e.target as HTMLElement)) {
        callback(e)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handler)
  })
}

export default useClickOutSide
