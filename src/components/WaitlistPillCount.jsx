import './WaitlistPillCount.css'

function WaitlistPillCount({ waitlistCount, digitOffsets = [], isAnimating = false }) {
  const digits = waitlistCount.toString().split('').map(digit => parseInt(digit))

  return (
    <div className="waitlist-pill">
      <div className="waitlist-pill-avatars">
        <img src="/images/amandapfp.svg" alt="Amanda" className="waitlist-pill-avatar" style={{ zIndex: 1 }} />
        <img src="/images/jonathanpfp.svg" alt="Jonathan" className="waitlist-pill-avatar" style={{ zIndex: 2 }} />
        <img src="/images/sharonpfp.svg" alt="Sharon" className="waitlist-pill-avatar" style={{ zIndex: 3 }} />
      </div>

      <span className="waitlist-pill-text">
        {digits.map((digit, index) => {
          const offset = digitOffsets[index] !== undefined ? digitOffsets[index] : 0

          return (
            <span key={`${digit}-${index}`} className="number-scroll-container" aria-hidden="true">
              <span
                className={`number-scroll ${isAnimating ? 'animating' : ''}`}
                style={{
                  transform: `translateY(-${offset * 1.1}rem)`,
                  transition: isAnimating
                    ? `transform ${1.5 + index * 0.2}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
                    : 'none'
                }}
              >
                {Array.from({ length: 100 }, (_, i) => i % 10).map((num, i) => (
                  <span key={i}>{num}</span>
                ))}
              </span>
            </span>
          )
        })}
        <span>+ waitlisted</span>
      </span>
    </div>
  )
}

export default WaitlistPillCount