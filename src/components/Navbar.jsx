import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import { FiClock } from 'react-icons/fi'
import './Navbar.css'

function Navbar({ isDarkSection }) {
  return (
    <nav className={`navbar ${isDarkSection ? 'navbar-dark' : ''}`}>
      <div className="nav-left">
        <a href="/" className="nav-logo-link">
          <div className="nav-logo-container">
            <img src="images/munchmascot.png" alt="Munch Mascot" className="nav-icon" />
            <span className="nav-logo">MUNCH</span>
          </div>
        </a>
      </div>
      <div className="nav-right">
        <a href="https://instagram.com/jointhemunch" target="_blank" rel="noopener noreferrer">
          <button className="nav-button">
            <PiPaperPlaneTiltFill className="button-icon" />
            <span>Instagram</span>
          </button>
        </a>
        <a href="#waitlist">
          <button className="nav-button">
            <FiClock className="button-icon" />
            <span>Join the Waitlist</span>
          </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
