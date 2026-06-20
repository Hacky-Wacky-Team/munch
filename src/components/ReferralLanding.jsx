import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import './ReferralLanding.css'

const APP_SCHEME = 'munchapp://'
const IOS_APP_STORE = 'https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842' // Replace with actual App Store ID
const ANDROID_PLAY_STORE = 'https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842'

function getOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios'
  return 'other'
}

function ReferralLanding() {
  const { code } = useParams()
  const [copyFeedback, setCopyFeedback] = useState(false)

  useEffect(() => {
    const deepLink = `${APP_SCHEME}referral/${code}`
    
    const tryOpenApp = () => {
      window.location.href = deepLink
    }

    const timer = setTimeout(tryOpenApp, 500)
    return () => clearTimeout(timer)
  }, [code])

  const handleOpenInApp = () => {
    const os = getOS()
    const deepLink = `${APP_SCHEME}referral/${code}`
    
    window.location.href = deepLink
    
    setTimeout(() => {
      if (os === 'ios') {
        window.location.href = IOS_APP_STORE
      } else if (os === 'android') {
        window.location.href = ANDROID_PLAY_STORE
      } else {
        window.location.href = IOS_APP_STORE
      }
    }, 1500)
  }

  const handlePasteCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopyFeedback(true)
      setTimeout(() => setCopyFeedback(false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <>
      <Navbar isDarkSection={false} />
      <div className="referral-landing-container">
        <div className="referral-landing-card">
          <div className="referral-landing-icon-wrapper">
            <img 
              src="/images/icon.png" 
              alt="Munch" 
              className="referral-landing-icon"
            />
          </div>
          
          <h1 className="referral-landing-title">Your friend referred you to Munch!</h1>
          <p className="referral-landing-subtitle">
            Enter their referral code when you signup
          </p>

          <div className="referral-code-container">
            <div className="referral-code-box">
              <span className="referral-code-text">{code}</span>
              <button 
                className="referral-paste-button"
                onClick={handlePasteCode}
                title="Copy referral code"
              >
                {copyFeedback ? (
                  <svg className="checkmark-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                ) : (
                  <img 
                    src="/images/pasteicon.svg" 
                    alt="Paste" 
                    className="paste-icon"
                  />
                )}
              </button>
            </div>
          </div>

          <button 
            className="referral-landing-button"
            onClick={handleOpenInApp}
          >
            Open Munch
          </button>

          <p className="referral-landing-footer">
            Don't have the app? Click the button to download it.
          </p>
        </div>
      </div>
    </>
  )
}

export default ReferralLanding
