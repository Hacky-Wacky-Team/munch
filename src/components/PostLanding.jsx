import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
import './PostLanding.css'

const APP_SCHEME = 'munchapp://'
const IOS_APP_STORE = 'https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842' // Replace with actual App Store ID
const ANDROID_PLAY_STORE = 'https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842'

function getOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera
  if (/android/i.test(userAgent)) return 'android'
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios'
  return 'other'
}

function PostLanding() {
  const { postId } = useParams()

  useEffect(() => {
    const deepLink = `${APP_SCHEME}post/${postId}`
    
    const tryOpenApp = () => {
      window.location.href = deepLink
    }

    const timer = setTimeout(tryOpenApp, 500)
    return () => clearTimeout(timer)
  }, [postId])

  const handleOpenInApp = () => {
    const os = getOS()
    const deepLink = `${APP_SCHEME}post/${postId}`
    
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

  return (
    <>
      <Navbar isDarkSection={false} />
      <div className="post-landing-container">
        <div className="post-landing-card">
          <div className="post-landing-icon-wrapper">
            <img 
              src="/images/icon.png" 
              alt="Munch" 
              className="post-landing-icon"
            />
          </div>
          
          <h1 className="post-landing-title">View this post on Munch</h1>
          <p className="post-landing-subtitle">
            Open in the Munch app to see the full recipe, comments, and more.
          </p>

          <button 
            className="post-landing-button"
            onClick={handleOpenInApp}
          >
            Open in Munch
          </button>

          <p className="post-landing-footer">
            Don't have the app? Click the button to download it.
          </p>
        </div>
      </div>
    </>
  )
}

export default PostLanding
