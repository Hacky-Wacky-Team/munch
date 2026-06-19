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
      
      <div className="footer-content">
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
