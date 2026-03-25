import { useRef, useEffect, useState } from 'react'
import SendIcon from "@/components/ui/send-icon";
import './Waitlist.css'

const CYCLING_WORDS = ['cravings', 'ingredients', 'scrolls', 'scraps', 'leftovers', 'recipes', 'groceries', 'no ideas', 'inspiration']

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
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [previousWordIndex, setPreviousWordIndex] = useState(null)
  const [isWordAnimating, setIsWordAnimating] = useState(false)
  const [cyclingWordWidth, setCyclingWordWidth] = useState(null)
  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  )
  const [heroFlattenProgress, setHeroFlattenProgress] = useState(0)
  const titleContainerRef = useRef(null)
  const heroImageContainerRef = useRef(null)
  const cyclingWordMeasureRef = useRef(null)
  const wordAnimationTimeoutRef = useRef(null)

  // Cycle through words every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex(prev => {
        const next = (prev + 1) % CYCLING_WORDS.length
        setPreviousWordIndex(prev)
        setIsWordAnimating(true)

        if (wordAnimationTimeoutRef.current) {
          clearTimeout(wordAnimationTimeoutRef.current)
        }

        wordAnimationTimeoutRef.current = setTimeout(() => {
          setPreviousWordIndex(null)
          setIsWordAnimating(false)
        }, 620)

        return next
      })
    }, 3000)
    return () => {
      clearInterval(interval)
      if (wordAnimationTimeoutRef.current) {
        clearTimeout(wordAnimationTimeoutRef.current)
      }
    }
  }, [])

  // Check mobile size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const updateCyclingWordWidth = () => {
      const measureEl = cyclingWordMeasureRef.current
      if (!measureEl) return

      const measuredWidth = measureEl.getBoundingClientRect().width
      const horizontalPadding = isMobile ? 60 : 100
      setCyclingWordWidth(Math.ceil(measuredWidth + horizontalPadding))
    }

    updateCyclingWordWidth()
    window.addEventListener('resize', updateCyclingWordWidth)
    return () => window.removeEventListener('resize', updateCyclingWordWidth)
  }, [currentWordIndex, isMobile])

  // Subtle perspective at top that eases to flat while scrolling down.
  useEffect(() => {
    let rafId = null

    const updateHeroPerspective = () => {
      rafId = null

      const scrollY = window.scrollY || window.pageYOffset || 0
      const flattenDistance = window.innerWidth <= 768 ? 240 : 260
      const progress = Math.max(0, Math.min(1, scrollY / flattenDistance))
      setHeroFlattenProgress(progress)
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updateHeroPerspective)
    }

    updateHeroPerspective()
    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [])

  const tiltDegrees = (isMobile ? 30 : 20) * (1 - heroFlattenProgress)
  const liftPixels = (isMobile ? 20 : 10) * (1 - heroFlattenProgress)
  const scaleY = 0.985 + (0.015 * heroFlattenProgress)

  return (
    <div id="waitlist" className="waitlist-container">
      {!showBottomVersion && (
        <div className="gradient-background">
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
          

          
          <h1 className="hero-title-line" style={{ color: '#d6dba0' }}>move from</h1>
          <div className="hero-title-line">
            <span className="hero-title-for-desktop">{' '}</span>
            <span
              className="cycling-word-wrapper"
              style={cyclingWordWidth ? { width: `${cyclingWordWidth}px` } : undefined}
            >
              <span className="cycling-word-bg" aria-hidden="true" />
              <span className="cycling-word-stage">
                {previousWordIndex !== null && isWordAnimating && (
                  <span
                    key={`out-${previousWordIndex}-${currentWordIndex}`}
                    className="cycling-word-item cycling-word-out"
                  >
                    {CYCLING_WORDS[previousWordIndex]}
                  </span>
                )}
                <span
                  key={`in-${currentWordIndex}`}
                  className={`cycling-word-item ${isWordAnimating ? 'cycling-word-in' : 'cycling-word-steady'}`}
                >
                  {CYCLING_WORDS[currentWordIndex]}
                </span>
              </span>
              <span ref={cyclingWordMeasureRef} className="cycling-word-measure" aria-hidden="true">
                {CYCLING_WORDS[currentWordIndex]}
              </span>
            </span>
          </div>
          <h1 className="hero-title-line">to real meals</h1>
          {/* <div className="hero-subtitle">See what real people are munching everyday.</div> */}
        </div>
      )}
{/* 
      <div className="hero-image-section" ref={heroImageRef}>
        <div className="hero-image-card">
          <img src={isMobile ? "images/titleimagemobile.png" : "images/titleimage.png"} alt="Munch preview" className="hero-image" />
        </div>
      </div> */}

      <div
        className="hero-image-container"
        ref={heroImageContainerRef}
        style={{
          transform: `perspective(1400px) rotateX(${tiltDegrees}deg) translateY(${liftPixels}px) scaleY(${scaleY})`
        }}
      >
        <img src={isMobile ? "images/heroimagemobile.png" : "images/heroimage.png"} alt="Munch preview" className="hero-image" />
      </div>

      <div className={`waitlist-box ${!showBottomVersion ? 'fade-rise-delay-2' : ''}`}>
        <div className="waitlist-left-panel">
          <h2 className="waitlist-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>Be the <strong>first</strong> to try munch when we launch</span>
          </h2>
          <div className="waitlist-send-icons">
            <SendIcon 
              size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 55 : 280}
              color="#d5f2d4" 
              className="waitlist-send-icon"
            />
            <SendIcon 
              size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 55 : 280}
              color="#bdebbb" 
              className="waitlist-send-icon"
            />
            <SendIcon 
              size={typeof window !== 'undefined' && window.innerWidth <= 768 ? 55 : 280}
              color="#a0e69d" 
              className="waitlist-send-icon"
            />
          </div>
        </div>
        <div className="waitlist-right-panel">
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
      </div>
    </div>
  )
}

export default Waitlist
