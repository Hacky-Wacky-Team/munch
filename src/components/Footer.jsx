import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import SendIcon from "@/components/ui/send-icon";
import DrawUnderline from '@/components/ui/DrawUnderline'
import './Footer.css'

function Footer({
  name,
  email,
  isSubmitting,
  onNameChange,
  onEmailChange,
  onSubmit,
  onGoogleSignup
}) {
  const [titleAnimated, setTitleAnimated] = useState(false)
  const titleSectionRef = useRef(null)
  const titleBoxesRef = useRef([])

  useEffect(() => {
    if (titleAnimated || !titleSectionRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !titleAnimated) {
            setTitleAnimated(true)
            observer.disconnect()

            titleBoxesRef.current.forEach((box, index) => {
              if (box) {
                const finalRotate = box.dataset.finalRotate

            // Defer animation to avoid forced reflow
            requestAnimationFrame(() => {
              gsap.fromTo(
                box,
                {
                  y: 50,
                  rotation: 0,
                  opacity: 0
                },
                {
                  y: 0,
                  rotation: parseFloat(finalRotate),
                  opacity: 1,
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'back.out(1.7)'
                }
              );
            });
              }
            })
          }
        })
      },
      { threshold: 0.5 }
    )

    if (titleSectionRef.current) {
      observer.observe(titleSectionRef.current)
    }

    return () => observer.disconnect()
  }, [titleAnimated])

  return (
    <footer className="footer">
      <div className="gradient-background-footer">
        <svg className="gradient-svg-footer gradient-svg-green-15-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1062" fill="none" preserveAspectRatio="none">
          <g filter="url(#filter0_f_860_219_footer)">
            <path d="M1588 31.2302V956.177C1588 984.118 1515.02 1024.38 1468 979.5C1347.5 864.5 1291.5 844 1156 825.5C943.5 780 561 772 405 825.5C268 860 177.5 993.5 82 993.5C51.5 993.5 -19 1014.36 -19 979.52V34.635C17.4232 6.91522 143.122 3.51111 165.146 98.8264C232.339 389.635 222.5 582.5 405 703.5C571 797.5 973.5 776 1149 703.5C1313.5 635.544 1372.06 428.54 1422.84 86.1834C1445.22 14.2107 1563.89 -1.35118 1588 31.2302Z" fill="#46C755" fillOpacity="0.15"/>
          </g>
          <defs>
            <filter id="filter0_f_860_219_footer" x="-120.4" y="-86.4" width="1809.8" height="1187.49" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_860_219"/>
            </filter>
          </defs>
        </svg>
        <svg className="gradient-svg-footer gradient-svg-green-25-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1062" fill="none" preserveAspectRatio="none">
          <g filter="url(#filter0_f_861_24_footer)">
            <path d="M1603 73.5V935C1578 967 1550 988.5 1490.5 945.025C1391 856 1374.5 811.5 1224 800C1152.46 789.676 996.409 779.237 829.982 775.99C801.604 776.086 772.831 775.753 743.837 774.991C590.938 774.474 439.97 780.969 347 800C176.5 857.267 144.5 945.025 76 967C11 984.975 -4.5 982 -32 945.025V99.0001C49.5 52.0001 71.6622 73.5 95 198.5C163 432.5 150.5 676.918 347 737.5C472.706 758.941 610.607 771.489 743.837 774.991C772.608 775.088 801.448 775.433 829.982 775.99C981.365 775.476 1121.5 762.725 1224 737.5C1410 691.724 1455 471.5 1490.5 198.5C1506.75 73.4997 1548 47.0001 1603 73.5Z" fill="#46C755" fillOpacity="0.25"/>
          </g>
          <defs>
            <filter id="filter0_f_861_24_footer" x="-133.4" y="-37.2213" width="1837.8" height="1116.32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_861_24"/>
            </filter>
          </defs>
        </svg>
        <svg className="gradient-svg-footer gradient-svg-yellow-footer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1568 1009" fill="none" preserveAspectRatio="none">
          <g filter="url(#filter0_f_861_26_footer)">
            <path d="M1629 121.504V827.032C1629 845.191 1611.79 924.534 1544 869.005C1444.5 787.504 1495 746.505 1283.5 729.505C1544 706.505 1490 566.005 1535 252.505C1558 130.504 1573 66.0048 1629 121.504Z" fill="#E6E581" fillOpacity="0.66"/>
            <path d="M-49.5 130.504C-2 88.5044 37 146.504 53.5 324.005C96.5 530.505 43.5 683.005 270.5 729.505C96 769.005 149.5 793.505 43.5 885.505C3.75029 920.005 -57.5 908.146 -57.5 885.505L-49.5 130.504Z" fill="#E6E581" fillOpacity="0.66"/>
          </g>
          <defs>
            <filter id="filter0_f_861_26_footer" x="-158.9" y="0.000389099" width="1889.3" height="1008.56" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
              <feGaussianBlur stdDeviation="50.7" result="effect1_foregroundBlur_861_26"/>
            </filter>
          </defs>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="section-header-footer">
          <h1 className='feature-title-footer'>Get <DrawUnderline>early</DrawUnderline> access.</h1>
        </div>
        
        <div className="waitlist-box-footer">
          <div className="waitlist-left-panel-footer">
          <h2 className="waitlist-header-footer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
              <div className="waitlist-button-row-footer">
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
                <button
                  type="button"
                  className="google-signup-btn-footer"
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
          <div className="waitlist-right-panel-footer">
            <img src="images/waitlistfoodimage.webp" alt="Food" className="waitlist-food-image-footer" />
          </div>
        </div>
        
        <div className="footer-title-section" ref={titleSectionRef}>
          <p className="footer-built-by-text">built by the</p>
          <div className="footer-title-row">
            <span 
              ref={el => titleBoxesRef.current[0] = el}
              className="footer-title-box" 
              style={{ opacity: 0 }}
              data-final-rotate="2"
            >munch</span>
            <span 
              ref={el => titleBoxesRef.current[1] = el}
              className="footer-title-box" 
              style={{ opacity: 0 }}
              data-final-rotate="-2"
            >team</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
