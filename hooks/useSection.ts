
import { useEffect, useState } from 'react'

export function useSectionObserver(sectionIds: string[]) {
  const [active, setActive] = useState<string>(sectionIds[0] || 'home')

  useEffect(() => {
    const handleScroll = () => {
      const viewportTop = window.scrollY
      const viewportBottom = viewportTop + window.innerHeight
      
      let activeSection = sectionIds[0] // fallback to first section

      // Check each section to see what's visible
      for (const id of sectionIds) {
        const element = document.getElementById(id)
        if (!element) continue

        const rect = element.getBoundingClientRect()
        const elementTop = rect.top + window.scrollY
        const elementBottom = elementTop + rect.height

        // If any part of this section is visible in viewport
        const isVisible = elementTop < viewportBottom && elementBottom > viewportTop

        if (isVisible) {
          activeSection = id // Keep updating to get the LAST visible section
        }
      }

      setActive(activeSection)
    }

    // Check on mount
    handleScroll()
    
    // Listen for scroll
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds])

  return active
}