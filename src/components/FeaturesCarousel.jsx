import { FiUser, FiHome, FiEdit3, FiCamera, FiBookmark, FiCalendar, FiShoppingCart } from 'react-icons/fi'
import './FeaturesCarousel.css'

function FeaturesCarousel({
  activeFeature,
  carouselCursor,
  onMouseMove,
  onMouseLeave,
  onClick,
  featuresTrackRef,
  carouselRef,
  scrollToFeature
}) {
  return (
    <>
      <div className="section-header">
        <h3 className="features-subtitle">More Features</h3>
        <h1 className='feature-title'>Cook. Share. Plan.<br></br>Built for how <span className="you-highlight">you</span> munch.</h1>
      </div>
      <div id="features" className="features-carousel" 
        ref={carouselRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        style={{ cursor: carouselCursor.show ? 'none' : 'default' }}
      >
        {carouselCursor.show && (
          <div 
            className="custom-carousel-cursor"
            style={{
              left: `${carouselCursor.x}px`,
              top: `${carouselCursor.y}px`,
            }}
          >
            <div className={`cursor-arrow ${carouselCursor.direction}`}>
              {carouselCursor.direction === 'right' ? '→' : '←'}
            </div>
          </div>
        )}
        <div className="features-track" ref={featuresTrackRef}>
          <div className="feature1">
            <div className="showcase-container">
              <img src="mockups/profile.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Create your own <strong>profile</strong> and connect with other foodies.</h2>
              </div>
              <div className="feature-label">
                <p>Your profile</p>
                <FiUser className="feature-label-icon" />
              </div>
            </div>
          </div>

          <div className="feature2">
            <div className="showcase-container">
              <img src="mockups/home.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Browse through your <strong>personalized feed</strong> and get inspired </h2>
              </div>
              <div className="feature-label">
                <p>Your feed</p>
                <FiHome className="feature-label-icon" />
              </div>
            </div>
          </div>

          <div className="feature3">
            <div className="showcase-container">
              <div className="showcase-content">
                <h2>Craft detailed posts.<br></br>Share your recipes with the <strong>world</strong>.</h2>
              </div>
              <img src="mockups/post.png" alt="App mockup" className="mockup-image" />
              <div className="feature-label">
                <p>Create post</p>
                <FiEdit3 className="feature-label-icon" />
              </div>
            </div>
          </div>
          <div className="feature4">
            <div className="showcase-container">
              <img src="mockups/recipe.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Scan with your <strong>camera</strong>.<br></br>Get recipes based off your pantry.</h2>
              </div>
              <div className="feature-label">
                <p>Ingredient scanner</p>
                <FiCamera className="feature-label-icon" />
              </div>
            </div>
          </div>

          <div className="feature5">
            <div className="showcase-container">
              <img src="mockups/saved.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Never lose a recipe.<br></br><strong>Save them</strong> all in one place.</h2>
              </div>
              <div className="feature-label">
                <p>Saved recipes</p>
                <FiBookmark className="feature-label-icon" />
              </div>
            </div>
          </div>

          <div className="feature6">
            <div className="showcase-container">
              <img src="mockups/mealprep.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>No time?<br></br>Let us help you <strong>plan your meals</strong>.</h2>
              </div>
              <div className="feature-label">
                <p>Meal prep</p>
                <FiCalendar className="feature-label-icon" />
              </div>
            </div>
          </div>

          <div className="feature7">
            <div className="showcase-container">
              <img src="mockups/grocery.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Plan your meals efficiently with<br></br>our built in <strong>grocery list</strong>.</h2>
              </div>
              <div className="feature-label">
                <p>Grocery list</p>
                <FiShoppingCart className="feature-label-icon" />
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
    </>
  )
}

export default FeaturesCarousel
