import { useState, useEffect, useRef } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [activeFeature, setActiveFeature] = useState(0)
  const featuresTrackRef = useRef(null)

  const handleJoinWaitlist = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields')
      return
    }

    setIsSubmitting(true)
    setMessage('')

    try {
      // Check if email already exists
      const q = query(collection(db, 'users'), where('email', '==', email.trim()))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setMessage('This email is already on the waitlist!')
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
      setName('')
      setEmail('')
    } catch (error) {
      console.error('Error adding document: ', error)
      setMessage('Something went wrong. Please try again.')
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

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <span className="nav-logo" style={{ color: '#243924ff' }}>MUNCH</span>
        </div>
        <div className="nav-right">
          <a href="#waitlist"><span className="nav-item" style={{ color: '#243924ff' }}>Join Waitlist</span></a>
        </div>
      </nav>
      <div className="main-content">
        <div className="background-container">
          {/* <img 
            src="/icons/mangostickyrice.webp" 
            alt="Mango Sticky Rice Sticker" 
            className="title-sticker mangostickyrice-sticker"
          /> */}
          {/* <img 
            src="/icons/parfait.webp" 
            alt="Parfait Sticker" 
            className="title-sticker parfait-sticker"
          /> */}
          {/* <img 
            src="/icons/croissant.webp" 
            alt="Croissant Sticker" 
            className="title-sticker croissant-sticker"
          /> */}
          {/* <img 
            src="/icons/sushi.webp" 
            alt="Sushi Sticker" 
            className="title-sticker sushi-sticker"
          /> */}
          <img 
            src="images/maincontentfood.webp" 
            alt="Main Content Food" 
            className="main-content-food-image"
          />
          {message && <p className="message">{message}</p>}
          <div id="waitlist" className="waitlist-container">
            <div className="titletext">
              <h1 className="title1">JOIN THE</h1>
              <h1 className="title2"><span style={{ color: '#3e974bff' }}>MUNCH</span>MENT</h1>
            </div>
            <div className="waitlist-box">
              <form onSubmit={handleJoinWaitlist}>
                <input
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                </button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="endorsement-section">
          <h2 className="endorsement-header">Loved by students at top schools</h2>
          <div className="university-logos-container">
            <div className="university-logos-row">
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
              {/* Duplicate set for seamless loop */}
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
              {/* Third set to ensure no gaps */}
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
            </div>
          </div>
        </div>
        
        <div className="scrolling-section">
          <div className="scrolling-text">
            <h2 className="scrolling-title">Join a Community of Foodies</h2>
            <p className="scrolling-description">Connect, share, and discover recipes with fellow food enthusiasts. Munch brings food lovers together in one deliciously vibrant community.
            </p>
          </div>
          <div className="scrolling-rows">
            <div className="scroll-row scroll-row-1">
            {/* First set of boxes */}
            <div className="scroll-box1"></div>
            <div className="scroll-box2"></div>
            <div className="scroll-box3"></div>
            <div className="scroll-box4"></div>
            <div className="scroll-box5"></div>
            <div className="scroll-box6"></div>
            {/* Second set - exact duplicate for seamless loop */}
            <div className="scroll-box box-color-1"></div>
            <div className="scroll-box box-color-2"></div>
            <div className="scroll-box box-color-3"></div>
            <div className="scroll-box box-color-4"></div>
            <div className="scroll-box box-color-5"></div>
            <div className="scroll-box box-color-6"></div>
          </div>
        </div>
        </div>
      </div>
      <div className='big-feature'>
        <div className='big-feature-content'>
          <h2>CAMERA</h2>
          <h1>Just a snap away from delicious recipes</h1>
          <p>Take a photo of your ingredients and let Munch do the rest. Discover recipes tailored to what you have on hand, making meal prep effortless and fun.</p>
          <div className="big-feature-badges">
            <div className="big-feature-badges-row">
              <span className="big-feature-badge">
                <span className="badge-icon">🤖</span>
                AI-Powered
              </span>
              <span className="big-feature-badge">
                <span className="badge-icon">🔍</span>
                Smart Ingredient Recognition
              </span>
            </div>
            <div className="big-feature-badges-row">
              <span className="big-feature-badge">
                <span className="badge-icon">♻️</span>
                Zero-Waste Cooking
              </span>
              <span className="big-feature-badge">
                <span className="badge-icon">👨‍🍳</span>
                Personalized Recipes
              </span>
            </div>
          </div>
          <img src="mockups/cameramockup2.webp" alt="Camera Mockup" className="big-feature-mockup" />
        </div>
      </div>
      <div className='big-feature'>

        <div className='big-feature-content'>
          <div>
          <h2>PERSONALIZED FEED</h2>
          <h1>Always one scroll away from your next meal</h1>
          <p>View what your friends are cooking and get real time inspiration! Share your food pics and discover new recipes together.</p>
          <div className="big-feature-badges">
            <div className="big-feature-badges-row">
              <span className="big-feature-badge">
                <span className="badge-icon">🤤</span>
                Cook up Inspiration
              </span>
              <span className="big-feature-badge">
                <span className="badge-icon">🔍</span>
                Find your Recipes
              </span>
            </div>
            <div className="big-feature-badges-row">
              <span className="big-feature-badge">
                <span className="badge-icon">🌏</span>
                Meet your Community
              </span>
              <span className="big-feature-badge">
                <span className="badge-icon">📱</span>
                Share your Recipes
              </span>
            </div>
          </div>
          </div>
          <img src="mockups/homemockup2.webp" alt="Camera Mockup" className="big-feature-mockup" />
        </div>
      </div>

      <div id="features" className="features-carousel">
        <h3 className="features-subtitle">More Features</h3>
        <h1 className='feature-title'>Designed just for You</h1>
        <div className="features-track" ref={featuresTrackRef}>
          <div className="feature1">
            <div className="showcase-container">
              <img src="mockups/profile.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Connect with Foodies</h2>
              </div>
            </div>
          </div>

          <div className="feature2">
            <div className="showcase-container">
              <img src="mockups/home.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Scroll through your Feed</h2>
              </div>
            </div>
          </div>

          <div className="feature3">
            <div className="showcase-container">
              <div className="showcase-content">
                <h2>Share your Recipes</h2>
              </div>
              <img src="mockups/post.webp" alt="App mockup" className="mockup-image" />
            </div>
          </div>
          <div className="feature4">
            <div className="showcase-container">
              <img src="mockups/recipe.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Recipes Based off your Pantry</h2>
              </div>
            </div>
          </div>

          <div className="feature5">
            <div className="showcase-container">
              <img src="mockups/saved.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Save your Recipes</h2>
              </div>
            </div>
          </div>

          <div className="feature6">
            <div className="showcase-container">
              <img src="mockups/mealprep.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Meal Prep</h2>
              </div>
            </div>
          </div>

          <div className="feature7">
            <div className="showcase-container">
              <img src="mockups/grocery.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Plan your Groceries</h2>
              </div>
            </div>
          </div>

        </div>
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <span
              key={index}
              className={`carousel-dot ${activeFeature === index ? 'active' : ''}`}
              onClick={() => scrollToFeature(index)}
            />
          ))}
        </div>
      </div>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Munch</h3>
            <p>The ultimate food companion.</p>
          </div>
          
          <div className="footer-section">
              {/* <h4>Contact</h4>
              <ul>
                <li>hello@munch.app</li>
                <li>Follow us @munchapp</li>
              </ul> */}
          </div>


          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#waitlist">Join Waitlist</a></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>

        </div>
        <div className="footer-image">
          <img src="images/footertext2.png" alt="Footer Design" />
        </div>
      </footer>
    
    </>
  )
}

export default App
