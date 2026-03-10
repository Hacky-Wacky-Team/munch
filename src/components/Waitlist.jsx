import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import SendIcon from "@/components/ui/send-icon";
import './Waitlist.css'

const CYCLING_WORDS = ['inspo', 'creations', 'meals', 'food', 'recipes', 'snacks', 'munch', 'ideas', 'craves']
// Duplicate first word at end for seamless loop
const DISPLAY_WORDS = [...CYCLING_WORDS, CYCLING_WORDS[0]]

function Waitlist({
  name,
  email,
  isSubmitting,
  waitlistCount,
  digitOffsets,
  isAnimating,
  getDigits,
  onNameChange,
  onEmailChange,
  onSubmit,
  onGoogleSignup,
  showBottomVersion = false
}) {
  const [titleAnimated, setTitleAnimated] = useState(false)
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [shouldTransition, setShouldTransition] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const titleContainerRef = useRef(null)
  const heroImageRef = useRef(null)
  const secondaryBoxesRef = useRef([])

  // Cycle through words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => prev + 1)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Handle seamless loop: when we land on the duplicate last word, snap back to 0
  useEffect(() => {
    if (currentWordIndex === CYCLING_WORDS.length) {
      const timeout = setTimeout(() => {
        setShouldTransition(false)
        setCurrentWordIndex(0)
        // Re-enable transition after browser paints the reset position
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setShouldTransition(true)
          })
        })
      }, 600) // wait for current transition to finish
      return () => clearTimeout(timeout)
    }
  }, [currentWordIndex])

  // Check mobile size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Animate food icons from behind the hero image to their final positions
  useEffect(() => {
    if (titleAnimated || !heroImageRef.current || !titleContainerRef.current || showBottomVersion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimated) {
            setTitleAnimated(true)
            observer.disconnect()

            // Pass 1: read dataset values (no layout), write all final positions (batch writes)
            const isMobile = window.innerWidth <= 768
            const isTablet = window.innerWidth > 768 && window.innerWidth <= 1224
            const boxData = secondaryBoxesRef.current.map((box, index) => {
              if (!box) return null

              let finalLeft = box.dataset.finalLeft
              let finalTop = box.dataset.finalTop
              let finalRotate = box.dataset.finalRotate

              if (isTablet) {
                const computedStyle = getComputedStyle(box)
                const tabletLeft = computedStyle.getPropertyValue('--tablet-final-left').trim()
                const tabletTop = computedStyle.getPropertyValue('--tablet-final-top').trim()
                const tabletRotate = computedStyle.getPropertyValue('--tablet-final-rotate').trim()

                if (tabletLeft) finalLeft = tabletLeft
                if (tabletTop) finalTop = tabletTop
                if (tabletRotate) finalRotate = tabletRotate
              } else if (isMobile) {
                const computedStyle = getComputedStyle(box)
                const mobileLeft = computedStyle.getPropertyValue('--mobile-final-left').trim()
                const mobileTop = computedStyle.getPropertyValue('--mobile-final-top').trim()
                const mobileRotate = computedStyle.getPropertyValue('--mobile-final-rotate').trim()

                if (mobileLeft) finalLeft = mobileLeft
                if (mobileTop) finalTop = mobileTop
                if (mobileRotate) finalRotate = mobileRotate
              }

              // Write final positions all together (no reads in between)
              box.style.left = finalLeft
              box.style.top = finalTop

              return { box, index, finalRotate }
            }).filter(Boolean)

            // Pass 2: use GSAP animation for all devices
            requestAnimationFrame(() => {
              const heroRect = heroImageRef.current.getBoundingClientRect()
              const heroCenterX = heroRect.left + heroRect.width / 2
              const heroCenterY = heroRect.top + heroRect.height / 2

              // Read all box positions in one batch before touching GSAP
              const rects = boxData.map(({ box }) => box.getBoundingClientRect())

              boxData.forEach(({ box, index, finalRotate }, i) => {
                const boxRect = rects[i]
                const offsetX = heroCenterX - (boxRect.left + boxRect.width / 2)
                const offsetY = heroCenterY - (boxRect.top + boxRect.height / 2)

                gsap.fromTo(
                  box,
                  {
                    x: offsetX,
                    y: offsetY,
                    scale: 0.3,
                    rotation: 0,
                    opacity: 0
                  },
                  {
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotation: parseFloat(finalRotate),
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.3 + index * 0.06,
                    ease: 'back.out(1.4)',
                    force3D: true
                  }
                )
              })
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    if (heroImageRef.current) {
      observer.observe(heroImageRef.current)
    }

    return () => observer.disconnect()
  }, [titleAnimated, showBottomVersion])

  return (
    <div id="waitlist" className="waitlist-container">
      {!showBottomVersion && (
        <div className="gradient-background">
          <img src="images/gradientbackground.png" alt="Gradient" className="gradient-image gradient-image-1" />
        </div>
      )}
      {!showBottomVersion && (
        <div className="titletext" ref={titleContainerRef}>
          <div className="waitlist-pill">
            <div className="waitlist-pill-avatars">
              <img src="images/amandapfp.svg" alt="Amanda" className="waitlist-pill-avatar" style={{ zIndex: 1 }} />
              <img src="images/jonathanpfp.svg" alt="Jonathan" className="waitlist-pill-avatar" style={{ zIndex: 2 }} />
              <img src="images/sharonpfp.svg" alt="Sharon" className="waitlist-pill-avatar" style={{ zIndex: 3 }} />
            </div>
            <span className="waitlist-pill-text">
              {getDigits(waitlistCount).map((digit, index) => {
                const offset = digitOffsets[index] !== undefined ? digitOffsets[index] : 0
                return (
                  <div key={index} className="number-scroll-container">
                    <div 
                      className={`number-scroll ${isAnimating ? 'animating' : ''}`}
                      style={{ 
                        transform: `translateY(-${offset * 1.1}rem)`,
                        transition: isAnimating 
                          ? `transform ${1.5 + index * 0.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94)` 
                          : 'none'
                      }}
                    >
                      {Array.from({ length: 100 }, (_, i) => i % 10).map((num, i) => (
                        <span key={i}>{num}</span>
                      ))}
                    </div>
                  </div>
                )
              })}
              + waitlisted
            </span>
          </div>
          

          
          <img 
            ref={el => secondaryBoxesRef.current[3] = el}
            src="foodicons/boba.png"
            alt="boba"
            className="top-title-food-icon" 
            style={{ zIndex: 1, opacity: 0 }}
            data-final-left="92%"
            data-final-top="124%"
            data-final-rotate="12"
          />
          <img 
            ref={el => secondaryBoxesRef.current[4] = el}
            src="foodicons/broccoli.png"
            alt="broccoli"
            className="top-title-food-icon" 
            style={{ zIndex: 2, opacity: 0 }}
            data-final-left="-3%"
            data-final-top="79%"
            data-final-rotate="-8"
          />
          <img 
            ref={el => secondaryBoxesRef.current[5] = el}
            src="foodicons/cake.png"
            alt="cake"
            className="top-title-food-icon" 
            style={{ zIndex: 3, opacity: 0 }}
            data-final-left="90%"
            data-final-top="75%"
            data-final-rotate="15"
          />
          <img 
            ref={el => secondaryBoxesRef.current[6] = el}
            src="foodicons/pie.png"
            alt="pie"
            className="top-title-food-icon" 
            style={{ zIndex: 1, opacity: 0 }}
            data-final-left="14%"
            data-final-top="106%"
            data-final-rotate="-12"
          />
          <img 
            ref={el => secondaryBoxesRef.current[7] = el}
            src="foodicons/salad.png"
            alt="salad"
            className="top-title-food-icon" 
            style={{ zIndex: 2, opacity: 0 }}
            data-final-left="74%"
            data-final-top="107%"
            data-final-rotate="10"
          />
          <img 
            ref={el => secondaryBoxesRef.current[8] = el}
            src="foodicons/sushi.png"
            alt="sushi"
            className="top-title-food-icon" 
            style={{ zIndex: 3, opacity: 0 }}
            data-final-left="-5%"
            data-final-top="127%"
            data-final-rotate="-10"
          />

          <h1 className="hero-title-line hero-title-line-desktop">Your social app</h1>
          <h1 className="hero-title-line hero-title-line-mobile">Your social app for</h1>
          <div className="hero-title-line">
            <span className="hero-title-for-desktop">for{' '}</span>
            <span className="cycling-word-wrapper">
              <span className="cycling-word-bg" aria-hidden="true" />
              <span
                className="cycling-word-track"
                style={{
                  transform: `translateY(-${currentWordIndex * (100 / DISPLAY_WORDS.length)}%)`,
                  transition: shouldTransition ? 'transform 0.6s cubic-bezier(0.65, 0, 0.35, 1)' : 'none'
                }}
              >
                {DISPLAY_WORDS.map((word, i) => (
                  <span key={`${word}-${i}`} className="cycling-word-item">{word}</span>
                ))}
              </span>
            </span>
            <span className="hero-logo-badge">
              <img src="images/fulllogo.svg" alt="Munch logo" className="hero-logo-img" />
            </span>
          </div>
          <div className="hero-subtitle">See what real people are munching.</div>
        </div>
      )}

      <div className="hero-image-section" ref={heroImageRef}>
        <div className="hero-image-card">
          <img src={isMobile ? "images/titleimagemobile.png" : "images/titleimage.png"} alt="Munch preview" className="hero-image" />
        </div>
      </div>

      <div className={`waitlist-box ${!showBottomVersion ? 'fade-rise-delay-2' : ''}`}>
        <div className="waitlist-left-panel">
          <h2 className="waitlist-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Be the <strong>first</strong> to try munch when we launch</span>
            <SendIcon 
              size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 55 : 80}
              color="#214221" 
              className="mb-[0px]"
            />
          </h2>
          <form onSubmit={onSubmit} noValidate>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={onNameChange}
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={onEmailChange}
              disabled={isSubmitting}
            />
            <div className="waitlist-button-row">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
              <button
                type="button"
                className="google-signup-btn"
                disabled={isSubmitting}
                onClick={onGoogleSignup}
              >
                <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>
          </form>
        </div>
        <div className="waitlist-right-panel">
          <img src="images/waitlistfoodimage.webp" alt="Food" className="waitlist-food-image" />
        </div>
      </div>
    </div>
  )
}

export default Waitlist
