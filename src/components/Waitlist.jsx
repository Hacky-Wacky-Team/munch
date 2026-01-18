import { FaApple } from 'react-icons/fa'
import { PiAndroidLogoFill, PiPaperPlaneTiltFill } from 'react-icons/pi'
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
  return (
    <div id="waitlist" className="waitlist-container">
      {!showBottomVersion && (
        <div className="titletext">
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
          <h1 className="title1">
            <span className="fall-text fall-delay-1">JOIN</span>{' '}
            <span className="fall-text fall-delay-2">THE</span>
          </h1>
          <h1 className="title2">
            <span className="fall-text fall-delay-3">
              <span className="munch-highlight">MUNCH</span>
            </span>{' '}
            <span className="fall-text fall-delay-4">MENT</span>
          </h1>
          <div className="title-buttons fade-rise-delay-1">
            <button className="title-button">
              <FaApple className="title-button-icon" />
              iOS
            </button>
            <button className="title-button">
              <PiAndroidLogoFill className="title-button-icon" />
              Android
            </button>
            <button className="title-button coming-soon-button">
              Coming Soon
            </button>
          </div>
        </div>
      )}
      <div className={`waitlist-box ${!showBottomVersion ? 'fade-rise-delay-2' : ''}`}>
        <div className="waitlist-left-panel">
          <h2 className="waitlist-header">Be the <strong>first</strong> to know when we launch<PiPaperPlaneTiltFill className="waitlist-header-icon" /></h2>
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
