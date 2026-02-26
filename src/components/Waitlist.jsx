import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { FaApple } from 'react-icons/fa'
import { PiAndroidLogoFill } from 'react-icons/pi'
import SendIcon from "@/components/ui/send-icon";
import './Waitlist.css'

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
  const titleContainerRef = useRef(null)
  const secondaryBoxesRef = useRef([])

  // Animate secondary title boxes when section comes into view
  useEffect(() => {
    if (titleAnimated || !titleContainerRef.current || showBottomVersion) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimated) {
            setTitleAnimated(true)
            observer.disconnect()

            // Animate each secondary box to its final position
            secondaryBoxesRef.current.forEach((box, index) => {
              if (box) {
                const isMobile = window.innerWidth <= 768
                let finalLeft = box.dataset.finalLeft
                let finalTop = box.dataset.finalTop
                let finalRotate = box.dataset.finalRotate

                // Use mobile-specific positions and rotation for iOS/Android boxes and stickers if on mobile
                if (isMobile) {
                  const computedStyle = getComputedStyle(box)
                  const mobileLeft = computedStyle.getPropertyValue('--mobile-final-left').trim()
                  const mobileTop = computedStyle.getPropertyValue('--mobile-final-top').trim()
                  const mobileRotate = computedStyle.getPropertyValue('--mobile-final-rotate').trim()

                  if (mobileLeft) finalLeft = mobileLeft
                  if (mobileTop) finalTop = mobileTop
                  if (mobileRotate) finalRotate = mobileRotate
                }

                gsap.fromTo(
                  box,
                  {
                    left: '50%',
                    top: '50%',
                    xPercent: -50,
                    yPercent: -50,
                    rotation: 0,
                    opacity: 0
                  },
                  {
                    left: finalLeft,
                    top: finalTop,
                    xPercent: 0,
                    yPercent: 0,
                    rotation: parseFloat(finalRotate),
                    opacity: 1,
                    duration: 0.6,
                    delay: 0.7 + index * 0.04,
                    ease: 'back.out(1.7)'
                  }
                )
              }
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (titleContainerRef.current) {
      observer.observe(titleContainerRef.current)
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
          
          <span 
            ref={el => secondaryBoxesRef.current[0] = el}
            className="top-title-box-secondary" 
            style={{ zIndex: 1, opacity: 0 }}
            data-final-left="24%"
            data-final-top="104%"
            data-final-rotate="-3"
          >
            <FaApple style={{ marginRight: '0.4rem',marginBottom: '0.4rem', display: 'inline', verticalAlign: 'middle' }} />
            iOS
          </span>
          <span 
            ref={el => secondaryBoxesRef.current[1] = el}
            className="top-title-box-secondary" 
            style={{ zIndex: 2, opacity: 0 }}
            data-final-left="38%"
            data-final-top="104%"
            data-final-rotate="4"
          >
            <PiAndroidLogoFill style={{ marginRight: '0.4rem', display: 'inline', verticalAlign: 'middle' }} />
            Android
          </span>
          <span 
            ref={el => secondaryBoxesRef.current[2] = el}
            className="top-title-box-secondary" 
            style={{ zIndex: 3, opacity: 0, whiteSpace: 'nowrap' }}
            data-final-left="57%"
            data-final-top="104%"
            data-final-rotate="-3"
          >Coming Soon</span>
          
          <img 
            ref={el => secondaryBoxesRef.current[3] = el}
            src="foodicons/boba.png"
            alt="boba"
            className="top-title-food-icon" 
            style={{ zIndex: 1, opacity: 0 }}
            data-final-left="81%"
            data-final-top="80%"
            data-final-rotate="12"
          />
          <img 
            ref={el => secondaryBoxesRef.current[4] = el}
            src="foodicons/broccoli.png"
            alt="broccoli"
            className="top-title-food-icon" 
            style={{ zIndex: 2, opacity: 0 }}
            data-final-left="5%"
            data-final-top="42%"
            data-final-rotate="-8"
          />
          <img 
            ref={el => secondaryBoxesRef.current[5] = el}
            src="foodicons/cake.png"
            alt="cake"
            className="top-title-food-icon" 
            style={{ zIndex: 3, opacity: 0 }}
            data-final-left="84%"
            data-final-top="39%"
            data-final-rotate="15"
          />
          <img 
            ref={el => secondaryBoxesRef.current[6] = el}
            src="foodicons/pie.png"
            alt="pie"
            className="top-title-food-icon" 
            style={{ zIndex: 1, opacity: 0 }}
            data-final-left="15%"
            data-final-top="6%"
            data-final-rotate="-12"
          />
          <img 
            ref={el => secondaryBoxesRef.current[7] = el}
            src="foodicons/salad.png"
            alt="salad"
            className="top-title-food-icon" 
            style={{ zIndex: 2, opacity: 0 }}
            data-final-left="75%"
            data-final-top="11%"
            data-final-rotate="10"
          />
          <img 
            ref={el => secondaryBoxesRef.current[8] = el}
            src="foodicons/sushi.png"
            alt="sushi"
            className="top-title-food-icon" 
            style={{ zIndex: 3, opacity: 0 }}
            data-final-left="7%"
            data-final-top="83%"
            data-final-rotate="-10"
          />

          <div className="top-title-row">
            <span className="top-title-box" style={{ transform: 'rotate(2deg)', display: 'inline-block' }}>Join</span>
            <span className="top-title-box" style={{ transform: 'rotate(-2deg)', display: 'inline-block' }}>The</span>
          </div>
          <div className="top-title-row">
            <span className="top-title-box munch-box" style={{ transform: 'rotate(-2deg)', display: 'inline-block'}}>Munch</span>
            {/* marginLeft="-4rem" */}
            <span className="top-title-box ment-box" style={{ transform: 'rotate(3deg)', display: 'inline-block'}}>ment</span>
          </div>
        </div>
      )}
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
          <img src="images/waitlistfoodimage.png" alt="Food" className="waitlist-food-image" />
        </div>
      </div>
    </div>
  )
}

export default Waitlist
