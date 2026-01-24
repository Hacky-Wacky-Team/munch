import { useState, useEffect, useRef } from 'react'
import './ImmersiveFeature.css'

function ImmersiveFeature() {
  const [scrollOffset, setScrollOffset] = useState(0)
  const lastScrollRef = useRef(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    let ticking = false
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false
            return
          }

          const rect = sectionRef.current.getBoundingClientRect()
          const windowHeight = window.innerHeight
          const currentScroll = window.scrollY
          const delta = currentScroll - lastScrollRef.current
          
          // Calculate trigger zones
          const topTrigger = windowHeight * 0.4 // 40% from top
          const bottomTrigger = windowHeight * 0.6 // 40% from bottom (60% from top)
          
          // Check if section is in the active zone
          const sectionTop = rect.top
          const sectionBottom = rect.bottom
          
          // Scrolling down: animate only if section top is above bottom trigger (60% from top)
          // Scrolling up: animate only if section bottom is below top trigger (40% from top)
          const isInActiveZone = 
            (delta > 0 && sectionTop < bottomTrigger && sectionBottom > 0) || // scrolling down
            (delta < 0 && sectionBottom > topTrigger && sectionTop < windowHeight) // scrolling up
          
          if (isInActiveZone) {
            // Accumulate scroll offset (scroll down = positive, scroll up = negative)
            // Max range: -80 to 80 pixels
            setScrollOffset((prev) => {
              const newOffset = prev + delta * 0.15 // Subtle multiplier
              return Math.max(-80, Math.min(80, newOffset))
            })
          }
          
          lastScrollRef.current = currentScroll
          ticking = false
        })
        
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="camera-mockup-wrap" ref={sectionRef}>
      <div className="camera-mockup-inner">
        <div 
          className="mockup-pair mockup-left"
          style={{ 
            transform: `translate(-50%, calc(-50% + ${-scrollOffset}px)) scale(0.85)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img src="/mockups/sideshadow.png" alt="Shadow left" className="camera-mockup-shadow" />
          <img src="/mockups/cameramockup2.png" alt="Camera Mockup left" className="camera-mockup-background" />
          <img src="/mockups/nakedphoneframe.png" alt="Phone Frame left" className="camera-mockup-frame" />
        </div>

        <div className="mockup-pair mockup-center">
          <img src="/mockups/sideshadow.png" alt="Shadow center" className="camera-mockup-shadow" />
          <img src="/mockups/cameramockup2.png" alt="Camera Mockup center" className="camera-mockup-background" />
          <img src="/mockups/nakedphoneframe.png" alt="Phone Frame center" className="camera-mockup-frame" />
        </div>

        <div 
          className="mockup-pair mockup-right"
          style={{ 
            transform: `translate(-50%, calc(-50% + ${-scrollOffset}px)) scale(0.85)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          <img src="/mockups/sideshadow.png" alt="Shadow right" className="camera-mockup-shadow" />
          <img src="/mockups/cameramockup2.png" alt="Camera Mockup right" className="camera-mockup-background" />
          <img src="/mockups/nakedphoneframe.png" alt="Phone Frame right" className="camera-mockup-frame" />
        </div>
      </div>
    </div>
  )
}

export default ImmersiveFeature
