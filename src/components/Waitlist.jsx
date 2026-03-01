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
            const boxData = secondaryBoxesRef.current.map((box, index) => {
              if (!box) return null

              let finalLeft = box.dataset.finalLeft
              let finalTop = box.dataset.finalTop
              let finalRotate = box.dataset.finalRotate

              if (isMobile) {
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

            // Pass 2: single rAF — batch read all rects, then animate (no interleaved write/read)
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
          <svg className="gradient-svg gradient-svg-green-15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1062" fill="none" preserveAspectRatio="none">
            <g filter="url(#filter0_f_860_219)">
              <path d="M1588 31.2302V956.177C1588 984.118 1515.02 1024.38 1468 979.5C1347.5 864.5 1291.5 844 1156 825.5C943.5 780 561 772 405 825.5C268 860 177.5 993.5 82 993.5C51.5 993.5 -19 1014.36 -19 979.52V34.635C17.4232 6.91522 143.122 3.51111 165.146 98.8264C232.339 389.635 222.5 582.5 405 703.5C571 797.5 973.5 776 1149 703.5C1313.5 635.544 1372.06 428.54 1422.84 86.1834C1445.22 14.2107 1563.89 -1.35118 1588 31.2302Z" fill="#46C755" fillOpacity="0.15"/>
            </g>
            <defs>
              <filter id="filter0_f_860_219" x="-120.4" y="-86.4" width="1809.8" height="1187.49" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_860_219"/>
              </filter>
            </defs>
          </svg>
          <svg className="gradient-svg gradient-svg-green-25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1062" fill="none" preserveAspectRatio="none">
            <g filter="url(#filter0_f_861_24)">
              <path d="M1603 73.5V935C1578 967 1550 988.5 1490.5 945.025C1391 856 1374.5 811.5 1224 800C1152.46 789.676 996.409 779.237 829.982 775.99C801.604 776.086 772.831 775.753 743.837 774.991C590.938 774.474 439.97 780.969 347 800C176.5 857.267 144.5 945.025 76 967C11 984.975 -4.5 982 -32 945.025V99.0001C49.5 52.0001 71.6622 73.5 95 198.5C163 432.5 150.5 676.918 347 737.5C472.706 758.941 610.607 771.489 743.837 774.991C772.608 775.088 801.448 775.433 829.982 775.99C981.365 775.476 1121.5 762.725 1224 737.5C1410 691.724 1455 471.5 1490.5 198.5C1506.75 73.4997 1548 47.0001 1603 73.5Z" fill="#46C755" fillOpacity="0.25"/>
            </g>
            <defs>
              <filter id="filter0_f_861_24" x="-133.4" y="-37.2213" width="1837.8" height="1116.32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_861_24"/>
              </filter>
            </defs>
          </svg>
          <svg className="gradient-svg gradient-svg-yellow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1009" fill="none" preserveAspectRatio="none">
            <g filter="url(#filter0_f_861_26)">
              <path d="M1629 121.504V827.032C1629 845.191 1611.79 924.534 1544 869.005C1444.5 787.504 1495 746.505 1283.5 729.505C1544 706.505 1490 566.005 1535 252.505C1558 130.504 1573 66.0048 1629 121.504Z" fill="#E6E581" fillOpacity="0.66"/>
              <path d="M-49.5 130.504C-2 88.5044 37 146.504 53.5 324.005C96.5 530.505 43.5 683.005 270.5 729.505C96 769.005 149.5 793.505 43.5 885.505C3.75029 920.005 -57.5 908.146 -57.5 885.505L-49.5 130.504Z" fill="#E6E581" fillOpacity="0.66"/>
            </g>
            <defs>
              <filter id="filter0_f_861_26" x="-158.9" y="0.000389099" width="1889.3" height="1008.56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_861_26"/>
              </filter>
            </defs>
          </svg>
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

          <div className="hero-title-line hero-title-line-desktop">Your social app</div>
          <div className="hero-title-line hero-title-line-mobile">Your social app for</div>
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
          <div className="hero-subtitle">See what real people are eating.</div>
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
            <span>Be the <strong>first</strong> to know when we launch</span>
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
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
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
