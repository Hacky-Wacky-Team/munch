import './ScrollingFeature.css'
import { ThreeDScrollTriggerContainer, ThreeDScrollTriggerRow } from '@/components/ui/ThreeDScrollTrigger'
import WorldIcon from "@/components/ui/world-icon";
import SoupIcon from "@/components/ui/soup-icon";

function ScrollingFeature() {
  const images = [
    '/images/post 1.webp',
    '/images/post 2.webp',
    '/images/post 3.webp',
    '/images/post 4.webp',
    '/images/post 5.webp',
    '/images/post 6.webp'
  ];

  return (
    <div className="scrolling-section">
      <div className="scrolling-text">
        <h2 className="scrolling-title">
          <div className="scrolling-icon-left" style={{ transform: 'rotate(-15deg)' }}>
            <WorldIcon size={120} color="#98e094" strokeWidth={1.7} />
          </div>
          <div className="scrolling-icon-right" style={{ transform: 'rotate(12deg)' }}>
            <SoupIcon size={120} color="#98e094" strokeWidth={1.7} />
          </div>
          <div className="scrolling-title-row">Join the scrumptious</div>
          <div className="scrolling-title-row">community of foodies</div>
          <div className="scrolling-subtitle">A space for real meals, real people, and real recipes.</div>
        </h2>
      </div>
      <ThreeDScrollTriggerContainer>
        <ThreeDScrollTriggerRow baseVelocity={3} direction={1} className="scroll-row">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="scroll-box"
              style={{ 
                backgroundImage: `url('${img}')`,
                marginRight: '2rem'
              }}
            />
          ))}
        </ThreeDScrollTriggerRow>
        <ThreeDScrollTriggerRow baseVelocity={3} direction={-1} className="scroll-row" style={{ marginTop: '2rem' }}>
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="scroll-box"
              style={{ 
                backgroundImage: `url('${img}')`,
                marginRight: '2rem'
              }}
            />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>
    </div>
  )
}

export default ScrollingFeature
