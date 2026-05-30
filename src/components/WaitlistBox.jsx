import SendIcon from '@/components/ui/send-icon'
import './WaitlistBox.css'

function WaitlistBox({
  name,
  email,
  isSubmitting,
  onNameChange,
  onEmailChange,
  onSubmit,
  onGoogleSignup
}) {
  const sendIconSize = typeof window !== 'undefined' && window.innerWidth <= 768 ? 55 : 280

  return (
    <section className="waitlist-box-section" aria-label="Waitlist form">
      <div id="waitlist-box" className="waitlist-box">
        <div className="waitlist-left-panel">
          <h2 className="waitlist-header">
            <span>Be the <strong>first</strong> to try munch when we launch</span>
          </h2>
          <div className="waitlist-send-icons" aria-hidden="true">
            <SendIcon size={sendIconSize} color="#d5f2d4" className="waitlist-send-icon" />
            <SendIcon size={sendIconSize} color="#bdebbb" className="waitlist-send-icon" />
            <SendIcon size={sendIconSize} color="#a0e69d" className="waitlist-send-icon" />
          </div>
        </div>

        <div className="waitlist-right-panel">
          <form onSubmit={onSubmit} noValidate>
            <input
              type="text"
              placeholder="name"
              value={name}
              onChange={onNameChange}
              disabled={isSubmitting}
            />
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={onEmailChange}
              disabled={isSubmitting}
            />
            <div className="waitlist-button-row">
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
              </button>
              <button
                type="button"
                className="google-signup-btn"
                disabled={isSubmitting}
                onClick={onGoogleSignup}
              >
                <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default WaitlistBox