import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const APP_STORE_URL = 'https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842'

function Navbar() {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const scrollToSection = (sectionId) => {
    if (!isHomePage) {
      window.location.href = `/#${sectionId}`
      return
    }

    const section = document.getElementById(sectionId)
    if (!section) return

    const navbar = document.querySelector('.navbar')
    const navbarHeight = navbar?.offsetHeight ?? 0
    const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight - 16

    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-bar">
        <div className="nav-left">
          <Link to="/" className="nav-logo-link">
            <div className="nav-logo-container">
              <img src="/images/logo.png" alt="Munch Mascot" className="nav-icon" />
              <span className="nav-logo">munch</span>
            </div>
          </Link>
        </div>

        <div className="nav-center">
          <button type="button" className="nav-link" onClick={() => scrollToSection('features')}>
            features
          </button>
          <button type="button" className="nav-link" onClick={() => scrollToSection('faq')}>
            faq
          </button>
        </div>

        <div className="nav-right">
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-download-button"
          >
            <img src="/herostars/applelogo.svg" alt="" aria-hidden="true" className="nav-download-icon" />
            <span>download</span>
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
