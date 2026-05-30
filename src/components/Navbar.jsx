import { FiSend, FiClock } from 'react-icons/fi'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar({ isDarkSection }) {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const scrollToWaitlistBox = () => {
    const waitlistBox = document.getElementById('waitlist-box')
    if (!waitlistBox) return

    waitlistBox.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <nav className={`navbar ${isDarkSection ? 'navbar-dark' : ''}`}>
      <div className="nav-left">
        <Link to="/" className="nav-logo-link">
          <div className="nav-logo-container">
            <img src="/images/logo.png" alt="Munch Mascot" className="nav-icon" />
            <span className="nav-logo">munch</span>
          </div>
        </Link>
      </div>
      <div className="nav-right">
        <a href="https://instagram.com/jointhemunch" target="_blank" rel="noopener noreferrer">
          <button className="nav-button">
            <FiSend className="button-icon" />
            <span>Instagram</span>
          </button>
        </a>
        {isHomePage && (
          <button type="button" className="nav-button" onClick={scrollToWaitlistBox}>
            <FiClock className="button-icon" />
            <span>Join Waitlist</span>
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
