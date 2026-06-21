import './HeroSection.css'
import DrawUnderline from '@/components/ui/DrawUnderline'
import { useEffect, useRef } from 'react'

function HeroSection() {
  const waveTimeoutRef = useRef(null)
  const wavePhaseTimeoutRef = useRef(null)
  const waveCycleTimeoutRef = useRef(null)
  const heroSectionRef = useRef(null)

  const PHASE1_END_MS = 880
  const PHASE2_START_MS = 1280
  const middlePauseDuration = 0
  const CYCLE_MS = 8000

  const resetWave = () => {
    const stars = document.querySelectorAll('.hero-star')
    const stickers = document.querySelectorAll('.hero-sticker')

    stars.forEach(star => {
      star.classList.remove('star-animating', 'star-animating-in')
      star.style.opacity = ''
      star.style.transform = ''
    })

    stickers.forEach(sticker => {
      sticker.classList.remove('sticker-animating', 'sticker-animating-in', 'sticker-held')
      sticker.style.opacity = ''
      sticker.style.left = ''
      sticker.style.top = ''
      sticker.style.transform = ''
    })
  }

  const holdMiddleState = () => {
    const stars = document.querySelectorAll('.hero-star')
    const stickers = document.querySelectorAll('.hero-sticker')

    stars.forEach(star => {
      star.style.opacity = '0'
      star.style.transform = 'translate(-50%, -50%) scale(0.9)'
      star.classList.remove('star-animating')
    })

    stickers.forEach(sticker => {
      sticker.classList.remove('sticker-animating')
      sticker.classList.add('sticker-held')
    })
  }

  const startPhase2 = () => {
    const stars = document.querySelectorAll('.hero-star')
    const stickers = document.querySelectorAll('.hero-sticker')

    stickers.forEach(sticker => {
      sticker.classList.add('sticker-animating-in')
      sticker.classList.remove('sticker-held')
    })

    stars.forEach(star => {
      star.classList.add('star-animating-in')
    })
  }

  const startPhase1 = () => {
    const stars = document.querySelectorAll('.hero-star')
    const stickers = document.querySelectorAll('.hero-sticker')

    stars.forEach(star => star.classList.add('star-animating'))
    stickers.forEach(sticker => sticker.classList.add('sticker-animating'))
  }

  const triggerWave = ({ startAtPhase2 = false } = {}) => {
    if (waveTimeoutRef.current) {
      clearTimeout(waveTimeoutRef.current)
    }
    if (wavePhaseTimeoutRef.current) {
      clearTimeout(wavePhaseTimeoutRef.current)
    }
    if (waveCycleTimeoutRef.current) {
      clearTimeout(waveCycleTimeoutRef.current)
    }

    resetWave()
    heroSectionRef.current?.classList.remove('hero-start-phase-2')

    void document.body.offsetHeight

    if (startAtPhase2) {
      holdMiddleState()
      void document.body.offsetHeight
      startPhase2()
    } else {
      startPhase1()

      wavePhaseTimeoutRef.current = setTimeout(holdMiddleState, PHASE1_END_MS)

      waveTimeoutRef.current = setTimeout(
        startPhase2,
        PHASE2_START_MS + middlePauseDuration
      )
    }

    waveCycleTimeoutRef.current = setTimeout(() => triggerWave(), CYCLE_MS)
  }

  useEffect(() => {
    triggerWave({ startAtPhase2: true })

    const heroButtonEnter = document.querySelector('.hero-button-enter')
    const heroButton = document.querySelector('.hero-button')

    const finishButtonIntro = () => {
      heroButtonEnter?.classList.add('hero-button-ready')
      heroButton?.classList.add('hero-button-ready')
    }

    const onButtonIntroEnd = (event) => {
      if (
        event.animationName === 'buttonInMotion' ||
        event.animationName === 'buttonInColors'
      ) {
        finishButtonIntro()
      }
    }

    heroButtonEnter?.addEventListener('animationend', onButtonIntroEnd)
    heroButton?.addEventListener('animationend', onButtonIntroEnd)

    if (heroButton) {
      heroButton.addEventListener('mouseenter', triggerWave)
    }

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
      heroButtonEnter?.removeEventListener('animationend', onButtonIntroEnd)
      heroButton?.removeEventListener('animationend', onButtonIntroEnd)
      heroButton?.removeEventListener('mouseenter', triggerWave)
    }
  }, [])

const goToWebsite = () => {
  window.location.href = "https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842"
}

  return (
    <section ref={heroSectionRef} className="hero-section hero-start-phase-2" aria-label="Hero section">
      <div className="hero-background" aria-hidden="true">
        <img src="/herostars/star7.svg" className="hero-star hero-star-7" alt="" />
        <img src="/herostars/star6.svg" className="hero-star hero-star-6" alt="" />
        <img src="/herostars/star5.svg" className="hero-star hero-star-5" alt="" />
        <img src="/herostars/star4.svg" className="hero-star hero-star-4" alt="" />
        <img src="/herostars/star3.svg" className="hero-star hero-star-3" alt="" />
        <img src="/herostars/star2.svg" className="hero-star hero-star-2" alt="" />
        <img src="/herostars/star1.svg" className="hero-star hero-star-1" alt="" />

        <img src="/images/heropost1.png" className="hero-sticker hero-sticker-post1" alt="" />
        <img src="/stickers/nigiristicker.svg" className="hero-sticker hero-sticker-nigiri" alt="" />
        <img src="/images/heroimagestack.png" className="hero-sticker hero-sticker-stack" alt="" />
        <img src="/stickers/cakesticker.svg" className="hero-sticker hero-sticker-cake" alt="" />
        <img src="/images/heropost2.png" className="hero-sticker hero-sticker-post2" alt="" />
        <img src="/images/heroprofile.png" className="hero-sticker hero-sticker-profile" alt="" />
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
          <div className="hero-button-enter">
            <button className="hero-button" type="button" onClick={goToWebsite}>
              <img src="/herostars/applelogo.svg" alt="Apple" className="hero-button-icon" />
              Get the app
            </button>
          </div>
        </div>

        <div className="hero-bottom-container" aria-hidden="true" />
      </div>
    </section>
  )
}

export default HeroSection