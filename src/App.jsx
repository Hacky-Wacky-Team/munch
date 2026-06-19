import { useState, useEffect, useRef } from 'react'
import './components/global.css'

// Import components
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeatureSection1 from './components/FeatureSection1'
import FeatureSection2 from './components/FeatureSection2'
import FeatureSection3 from './components/FeatureSection3'
import FeatureSection4 from './components/FeatureSection4'
import FeatureSection5 from './components/FeatureSection5'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [toastExiting, setToastExiting] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)


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

  
  return (
    <>
      <Navbar isDarkSection={isDarkSection} />
      <div className="main-content">

        {/* HERO SECTION */}
        <HeroSection />

        {/* FEATURE SECTION */}
        <FeatureSection1 />

        {/* FEATURE SECTION 2 */}
        <FeatureSection2 />

        {/* FEATURE SECTION 3 */}
        <FeatureSection3 />

        {/* FEATURE SECTION 4 */}
        <FeatureSection4 />

        {/* FEATURE SECTION 5 */}
        <FeatureSection5 />
      </div>

      {/* FAQ SECTION */}
      <FAQ />

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
