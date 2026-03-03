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
        <img src="images/gradientbackground.png" alt="Gradient" className="gradient-image-footer gradient-image-1-footer" />
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
