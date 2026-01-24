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
          {typeof window !== 'undefined' && window.innerWidth <= 768 ? (
            <>
              <div className="scrolling-title-row">
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(-3deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>a</span>
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(2deg)', display: 'inline-block',backgroundColor: '#ffffff' }}>scrumptious</span>
              </div>
              <div className="scrolling-title-row">
                <span className="scrolling-title-box" style={{ transform: 'rotate(2deg)', display: 'inline-block',backgroundColor: '#6ed26e',color: '#ffffff' }}>community</span>
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(-2deg)', display: 'inline-block',backgroundColor: '#ffffff' }}>of</span>
                {' '}
                <WorldIcon size={55} color="#214221" className="mb-[10px]" />
                <span className="scrolling-title-box" style={{ transform: 'rotate(3deg)', display: 'inline-block',backgroundColor: '#ffffff' }}>foodies</span>
                <SoupIcon size={55} color="#214221" className="mb-[10px]" />
              </div>
            </>
          ) : (
            <>
              <div className="scrolling-title-row">
                <WorldIcon size={100} color="#214221" className="mb-[-4px] ml-[0px] mr-[-10px]" />
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(-3deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>a</span>
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(2deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>scrumptious</span>
                {' '}
                <SoupIcon size={100} color="#214221" className="mb-[-4px] ml-[0px] mr-[-10px]" />
              </div>
              <div className="scrolling-title-row">
                <span className="scrolling-title-box" style={{ transform: 'rotate(2deg)', display: 'inline-block', backgroundColor: '#6ed26e', color: '#ffffff' }}>community</span>
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(-2deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>of</span>
                {' '}
                <span className="scrolling-title-box" style={{ transform: 'rotate(3deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>foodies</span>
              </div>
            </>
          )}
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
