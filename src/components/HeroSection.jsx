import './HeroSection.css'
import DrawUnderline from '@/components/ui/DrawUnderline'
import { useEffect, useRef } from 'react'

function HeroSection() {
  const waveTimeoutRef = useRef(null)
  const wavePhaseTimeoutRef = useRef(null)
  const waveCycleTimeoutRef = useRef(null)

  const triggerWave = () => {
    // Clear any pending wave timer
    if (waveTimeoutRef.current) {
      clearTimeout(waveTimeoutRef.current)
    }
    if (wavePhaseTimeoutRef.current) {
      clearTimeout(wavePhaseTimeoutRef.current)
    }
    if (waveCycleTimeoutRef.current) {
      clearTimeout(waveCycleTimeoutRef.current)
    }

    // Get all hero stars except star1
    const stars = document.querySelectorAll('.hero-star')

    // Remove animation classes to reset
    stars.forEach(star => {
      star.classList.remove('star-animating', 'star-animating-in')
      star.style.opacity = '' // Clear inline opacity
      star.style.transform = '' // Clear inline transform
    })

    // Trigger reflow to restart animation
    void document.body.offsetHeight

    // Phase 1: Fade-out wave (7→6→5→4→3→2)
    stars.forEach(star => star.classList.add('star-animating'))

    // After Phase 1 completes (max delay 0.5s + animation 0.15s = 0.65s)
    // Preserve opacity 0 and scale 0.9 for all stars
    // TIMING TUNING: Phase 1 end time (in milliseconds)
    wavePhaseTimeoutRef.current = setTimeout(() => {
      stars.forEach(star => {
        star.style.opacity = '0' // Explicitly preserve opacity
        star.style.transform = 'translate(-50%, -50%) scale(0.9)' // Preserve scale
        star.classList.remove('star-animating')
      })
    }, 880)

    // Middle delay: pause at opacity 0 (adjust this value to change middle pause duration)
    // TIMING TUNING: Middle pause duration (currently 1000ms = 1s)
    const middlePauseDuration = 0
    
    // Phase 2: Fade-in wave (2→3→4→5→6→7) - starts after middle pause
    // Total: 0.65s (Phase 1) + 1s (middle pause) = 1.65s before Phase 2 starts
    waveTimeoutRef.current = setTimeout(() => {
      stars.forEach(star => {
        star.classList.add('star-animating-in')
      })
    }, 1280 + middlePauseDuration)

    // Schedule next wave cycle
    // TIMING TUNING: Total cycle duration (currently 5300ms = 5.3s)
    // Formula: Phase1(0.65s) + MiddlePause(1s) + Phase2(0.65s) + buffer(3s) = ~5.3s
    waveCycleTimeoutRef.current = setTimeout(triggerWave, 6000)
  }

  useEffect(() => {
    // Trigger wave on component mount
    triggerWave()

    // Add hover listener to hero button
    const heroButton = document.querySelector('.hero-button')
    if (heroButton) {
      heroButton.addEventListener('mouseenter', triggerWave)
    }

    // Cleanup
    return () => {
      if (waveTimeoutRef.current) {
        clearTimeout(waveTimeoutRef.current)
      }
      if (wavePhaseTimeoutRef.current) {
        clearTimeout(wavePhaseTimeoutRef.current)
      }
      if (waveCycleTimeoutRef.current) {
        clearTimeout(waveCycleTimeoutRef.current)
      }
      const heroButton = document.querySelector('.hero-button')
      if (heroButton) {
        heroButton.removeEventListener('mouseenter', triggerWave)
      }
    }
  }, [])

const goToWebsite = () => {
  window.location.href = "https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842"
}

  return (
    <section className="hero-section" aria-label="Hero section">
      <div className="hero-background" aria-hidden="true">
        <img src="/herostars/star7.svg" className="hero-star hero-star-7" alt="" />
        <img src="/herostars/star6.svg" className="hero-star hero-star-6" alt="" />
        <img src="/herostars/star5.svg" className="hero-star hero-star-5" alt="" />
        <img src="/herostars/star4.svg" className="hero-star hero-star-4" alt="" />
        <img src="/herostars/star3.svg" className="hero-star hero-star-3" alt="" />
        <img src="/herostars/star2.svg" className="hero-star hero-star-2" alt="" />
        <img src="/herostars/star1.svg" className="hero-star hero-star-1" alt="" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">A social app</span>
          <span className="hero-title-line">that helps</span>
          <span className="hero-title-line">
            you <span className="accent-text">cook</span>
          </span>
        </h1>

        <img src="/herostars/heroarrow.svg" className="hero-arrow" alt="" />

        <div className="hero-button-container">
          <button className="hero-button" type="button" onClick={goToWebsite}>
            <img src="/herostars/applelogo.svg" alt="Apple" className="hero-button-icon" />
            Get the app
          </button>
        </div>

        <div className="hero-bottom-container" aria-hidden="true" />
      </div>
    </section>
  )
}

export default HeroSection