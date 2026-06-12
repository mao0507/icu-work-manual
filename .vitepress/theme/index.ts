import DefaultTheme from 'vitepress/theme'
import { useRoute } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()
    let zoom: { detach: () => void } | null = null

    const setupZoom = async () => {
      if (typeof window === 'undefined') return
      if (zoom) {
        zoom.detach()
        zoom = null
      }
      await nextTick()
      const imgs = document.querySelectorAll('.zoomable img')
      if (!imgs.length) return
      const mediumZoom = (await import('medium-zoom')).default
      zoom = mediumZoom(imgs, {
        background: 'rgba(0, 0, 0, 0.85)',
        margin: 16,
      })
    }

    onMounted(() => {
      setupZoom()
      watch(() => route.path, () => setupZoom())
    })
  },
}
