import './FeatureSection4.css'
import Profile from './Profile'

function FeatureSection4() {
    return (
        <section className="feature-section-4" aria-label="Feature section 4">
            <div className="feature-section-4__inner">
                <div className="feature-section-4__copy">
                    <h2 className="feature-section-4__title" aria-label="Share your art with the world">
                        <span>Express</span>
                        <span>your inner</span>
                        <span>big back</span>
                    </h2>
                    <p className="feature-section-4__subtitle">
                        Build your profile, collect badges, and show off your personality. Whether you're a meal prep master or a midnight muncher, there's a place for you on Munch.
                    </p>
                </div>

                <div className="feature-section-4__mockup-shell" aria-label="Recipe mockup preview">
                    <Profile />
                </div>
            </div>
        </section>
    )
}

export default FeatureSection4
