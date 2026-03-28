import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const root = document.getElementById('root')
    const scrollingElement = document.scrollingElement || html || body

    const previousHtmlBehavior = html.style.scrollBehavior
    const previousBodyBehavior = body.style.scrollBehavior

    const forceTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      if (scrollingElement) {
        scrollingElement.scrollTop = 0
        scrollingElement.scrollLeft = 0
      }
      html.scrollTop = 0
      body.scrollTop = 0
      if (root) {
        root.scrollTop = 0
        root.scrollLeft = 0
      }
    }

    // Disable smooth behavior during route transition so reset is immediate.
    html.style.scrollBehavior = 'auto'
    body.style.scrollBehavior = 'auto'

    forceTop()
    const rafId = window.requestAnimationFrame(forceTop)
    const timeoutId = window.setTimeout(() => {
      forceTop()
      html.style.scrollBehavior = previousHtmlBehavior
      body.style.scrollBehavior = previousBodyBehavior
    }, 120)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(timeoutId)
      html.style.scrollBehavior = previousHtmlBehavior
      body.style.scrollBehavior = previousBodyBehavior
    }
  }, [location.key])

  return null
}
