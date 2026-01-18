import './ScrollingFeature.css'

function ScrollingFeature() {
  return (
    <div className="scrolling-section">
      <div className="scrolling-text">
        <h2 className="scrolling-title">Join a <span className="community-highlight">Community</span> of Foodies</h2>
        <p className="scrolling-description">
          <span className="desktop-text">Connect, share, and discover recipes with fellow food enthusiasts. Munch brings food lovers together in one deliciously vibrant community.</span>
          <span className="mobile-text">Connect, share, and discover recipes. Munch brings food lovers together in one vibrant community.</span>
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
  )
}

export default ScrollingFeature
