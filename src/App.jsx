import { useState, useEffect, useRef } from 'react'
import './components/global.css'

// Import components
import Navbar from './components/Navbar'
import Waitlist from './components/Waitlist'
import Endorsement from './components/Endorsement'
import ScrollingFeature from './components/ScrollingFeature'
import Camera from './components/Camera'
import RecipeInstructions from './components/RecipeInstructions'
import Student from './components/Student'
import FeaturesCarousel from './components/FeaturesCarousel'
import Footer from './components/Footer'
import Profile from './components/Profile'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastExiting, setToastExiting] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const [carouselCursor, setCarouselCursor] = useState({ show: false, x: 0, y: 0, direction: 'right' })
  const [waitlistCount, setWaitlistCount] = useState(200)
  const [digitOffsets, setDigitOffsets] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const featuresTrackRef = useRef(null)
  const carouselRef = useRef(null)

  // Helper function to split number into digits
  const getDigits = (num) => {
    return num.toString().split('').map(d => parseInt(d))
  }

  // Toast auto-dismiss after 5 seconds with exit animation
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setToastExiting(true)
        const exitTimer = setTimeout(() => {
          setShowToast(false)
          setToastExiting(false)
        }, 300) // duration of slideDown animation
        return () => clearTimeout(exitTimer)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Animate waitlist count with slot machine effect
  useEffect(() => {
    if (waitlistCount === 0) return

    const finalDigits = getDigits(waitlistCount)
    const numDigits = finalDigits.length
    
    // Initialize at 0 position for all digits
    setDigitOffsets(finalDigits.map(() => 0))
    
    // Trigger animation after a brief delay
    setTimeout(() => {
      // Each digit will scroll through multiple full cycles (0-9) before landing on final digit
      const offsets = finalDigits.map((digit, index) => {
        // Number of full 0-9 cycles to scroll through (stagger for visual effect)
        // Keep it reasonable to not exceed array bounds
        const numCycles = Math.min(3 + (numDigits - index - 1), 8)
        // Position = (full cycles * 10) + final digit
        // This ensures we land exactly on the target digit
        return (numCycles * 10) + digit
      })
      
      setIsAnimating(true)
      setDigitOffsets(offsets)
      
      // Reset animation flag after animation completes
      setTimeout(() => {
        setIsAnimating(false)
      }, 2000)
    }, 100)
  }, [waitlistCount])

  // Detect when user is in dark section for navbar color change
  useEffect(() => {
    const handleScroll = () => {
      const darkSection = document.querySelector('.dark-background-section')
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect()
        const isInDarkSection = rect.top <= 100 && rect.bottom >= 100
        setIsDarkSection(isInDarkSection)
      }

      // Trigger highlight animations on scroll
      const triggerHighlight = (selector) => {
        const element = document.querySelector(selector)
        if (element && !element.classList.contains('highlight-active')) {
          const rect = element.getBoundingClientRect()
          const windowHeight = window.innerHeight
          if (rect.top < windowHeight * 0.7) {
            element.classList.add('highlight-active')
          }
        }
      }

      triggerHighlight('.community-highlight')
      triggerHighlight('.camera-ai-highlight')
      triggerHighlight('.feed-highlight')
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleJoinWaitlist = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields')
      setShowToast(true)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setMessage('Please enter a valid email address')
      setShowToast(true)
      return
    }

    setIsSubmitting(true)
    setMessage('')
    setShowToast(false)

    try {
      // Lazy-load Firebase only when the form is actually submitted
      const [{ db }, { collection, addDoc, query, where, getDocs }] = await Promise.all([
        import('./firebase'),
        import('firebase/firestore')
      ])

      // Check if email already exists
      const q = query(collection(db, 'users'), where('email', '==', email.trim()))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setMessage('This email is already on the waitlist!')
        setShowToast(true)
        setIsSubmitting(false)
        return
      }

      // Add document to Firestore
      await addDoc(collection(db, 'users'), {
        name: name.trim(),
        email: email.trim(),
        timestamp: new Date()
      })

      setMessage('Successfully joined the waitlist!')
      setShowToast(true)
      setName('')
      setEmail('')
    } catch (error) {
      console.error('Error adding document: ', error)
      setMessage('Something went wrong. Please try again.')
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGoogleSignup = async () => {
    setIsSubmitting(true)
    setMessage('')
    setShowToast(false)

    try {
      const [{ auth, googleProvider, db }, { signInWithPopup, signOut }, { doc, setDoc, serverTimestamp }] = await Promise.all([
        import('./firebase'),
        import('firebase/auth'),
        import('firebase/firestore')
      ])

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      await setDoc(doc(db, 'users', user.uid), {
        name: user.displayName || '',
        email: user.email || '',
        provider: 'google',
        timestamp: serverTimestamp()
      }, { merge: true })

      await signOut(auth)

      setMessage('Successfully joined the waitlist!')
      setShowToast(true)
    } catch (error) {
      if (error.code === 'auth/popup-closed-by-user') {
        // User dismissed — silently ignore
      } else {
        console.error('Google signup error:', error)
        setMessage('Something went wrong. Please try again.')
        setShowToast(true)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Carousel functionality
  useEffect(() => {
    const handleScroll = () => {
      const track = featuresTrackRef.current
      if (!track) return

      const scrollLeft = track.scrollLeft
      const scrollWidth = track.scrollWidth
      const clientWidth = track.clientWidth
      const features = track.children

      // Check if at the very start (first feature)
      if (scrollLeft <= 10) {
        setActiveFeature(0)
        return
      }

      // Check if at the very end (last feature)
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        setActiveFeature(features.length - 1)
        return
      }

      // For middle positions, use center-based detection
      const trackRect = track.getBoundingClientRect()
      const trackCenter = trackRect.left + trackRect.width / 2

      let closestFeature = 0
      let minDistance = Infinity

      for (let i = 0; i < features.length; i++) {
        const feature = features[i]
        const featureRect = feature.getBoundingClientRect()
        const featureCenter = featureRect.left + featureRect.width / 2
        const distance = Math.abs(featureCenter - trackCenter)

        if (distance < minDistance) {
          minDistance = distance
          closestFeature = i
        }
      }

      setActiveFeature(closestFeature)
    }

    const track = featuresTrackRef.current
    if (track) {
      track.addEventListener('scroll', handleScroll)
      handleScroll() // Initial call
    }

    return () => {
      if (track) {
        track.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollToFeature = (index) => {
    const track = featuresTrackRef.current
    if (!track) return

    const feature = track.children[index]
    if (feature) {
      const trackRect = track.getBoundingClientRect()
      const featureRect = feature.getBoundingClientRect()
      const scrollLeft = track.scrollLeft + featureRect.left - trackRect.left - (trackRect.width - featureRect.width) / 2

      track.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const scrollToNextFeature = () => {
    if (activeFeature < 6) {
      scrollToFeature(activeFeature + 1)
    }
  }

  const scrollToPrevFeature = () => {
    if (activeFeature > 0) {
      scrollToFeature(activeFeature - 1)
    }
  }

  const handleCarouselMouseMove = (e) => {
    const carousel = carouselRef.current
    if (!carousel) return

    const rect = carousel.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    // Don't show cursor if mouse is below the features track (in the indicators area)
    const featuresTrack = featuresTrackRef.current
    if (featuresTrack) {
      const trackRect = featuresTrack.getBoundingClientRect()
      if (e.clientY > trackRect.bottom) {
        setCarouselCursor({ show: false, x: 0, y: 0, direction: 'right' })
        return
      }
    }
    
    const midPoint = rect.width / 2
    const direction = x < midPoint ? 'left' : 'right'

    setCarouselCursor({
      show: true,
      x: e.clientX,
      y: e.clientY,
      direction
    })
  }

  const handleCarouselMouseLeave = () => {
    setCarouselCursor({ show: false, x: 0, y: 0, direction: 'right' })
  }

  const handleCarouselClick = () => {
    if (carouselCursor.direction === 'right') {
      scrollToNextFeature()
    } else {
      scrollToPrevFeature()
    }
  }

  // Handle wheel events for better scroll behavior
  useEffect(() => {
    const track = featuresTrackRef.current
    if (!track) return

    const handleWheel = (e) => {
      // Only intercept Shift+wheel for mouse users
      // Let trackpad horizontal scrolling work naturally
      if (e.shiftKey && Math.abs(e.deltaY) > 0) {
        e.preventDefault()
        
        // Temporarily disable smooth scrolling for instant response
        const originalBehavior = track.style.scrollBehavior
        track.style.scrollBehavior = 'auto'
        
        // Apply mouse wheel scroll (convert vertical to horizontal)
        track.scrollLeft += e.deltaY * 3
        
        // Restore smooth scrolling after a brief delay
        requestAnimationFrame(() => {
          track.style.scrollBehavior = originalBehavior
        })
      }
      // For trackpad horizontal (deltaX) and vertical scroll, let browser handle naturally
    }

    track.addEventListener('wheel', handleWheel, { passive: false })
    
    return () => {
      track.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <>
      <Navbar isDarkSection={isDarkSection} />
      <div className="main-content">

        {/* WAITLIST SECTION */}
        <Waitlist
          name={name}
          email={email}
          isSubmitting={isSubmitting}
          waitlistCount={waitlistCount}
          digitOffsets={digitOffsets}
          isAnimating={isAnimating}
          getDigits={getDigits}
          onNameChange={(e) => setName(e.target.value)}
          onEmailChange={(e) => setEmail(e.target.value)}
          onSubmit={handleJoinWaitlist}
          onGoogleSignup={handleGoogleSignup}
          showBottomVersion={false}
        />

        {/* SCROLLING FEATURE SECTION */}
        <ScrollingFeature />
      </div>

      {/* PROFILE SECTION */}
      <Profile />

      {/* RECIPE INSTRUCTIONS SECTION */}
      <RecipeInstructions />

      {/* BIG FEATURES SECTION */}
      <Camera />

      {/* STUDENT SECTION */}
      <Student />

      {/* FEATURE CAROUSEL */}
      <FeaturesCarousel
        activeFeature={activeFeature}
        carouselCursor={carouselCursor}
        onMouseMove={handleCarouselMouseMove}
        onMouseLeave={handleCarouselMouseLeave}
        onClick={handleCarouselClick}
        featuresTrackRef={featuresTrackRef}
        carouselRef={carouselRef}
        scrollToFeature={scrollToFeature}
      />

      {/* FOOTER */}
      <Footer 
        name={name}
        email={email}
        isSubmitting={isSubmitting}
        onNameChange={(e) => setName(e.target.value)}
        onEmailChange={(e) => setEmail(e.target.value)}
        onSubmit={handleJoinWaitlist}
        onGoogleSignup={handleGoogleSignup}
      />

      {/* Toast notification */}
      {showToast && (
        <div className={`toast ${toastExiting ? 'toast-exit' : ''}`}>
          {message}
        </div>
      )}
    </>
  )
}

export default App
