import './HeroSection.css'
import DrawUnderline from '@/components/ui/DrawUnderline'

function HeroSection() {
  const scrollToWaitlistBox = () => {
    const waitlistBox = document.getElementById('waitlist-box')
    if (!waitlistBox) return

    waitlistBox.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <section className="hero-section" aria-label="Hero section">
      <div className="hero-background" aria-hidden="true">
        <div className="hero-gradient" />
        <div className="hero-star-shape" />
        <div className="hero-glow" />
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">A social app</span>
          <span className="hero-title-line">that helps</span>
          <span className="hero-title-line">
            you <span className="hero-accent"><DrawUnderline>cook</DrawUnderline></span>
          </span>
        </h1>

        <p className="hero-subtitle">
          Munch is the only feed that takes you from scrolling to cooking every time.
        </p>

        <div className="hero-button-container">
          <button className="hero-button" type="button" onClick={scrollToWaitlistBox}>
            Join waitlist
          </button>
        </div>

        <div className="hero-bottom-container" aria-hidden="true" />
      </div>
    </section>
  )
}

export default HeroSection