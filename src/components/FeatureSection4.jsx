import './FeatureSection4.css'
import Profile from './Profile'

function FeatureSection4() {
    return (
        <section className="feature-section-4" aria-label="Feature section 4">
            <div className="feature-section-4__inner">
                <div className="feature-section-4__copy">
                    <h2 className="feature-section-4__title" aria-label="Share your art with the world">
                        <span>Express</span>
                        {/* <span className="feature-section-4__title-line">
                            <span className="feature-section-4__title-badge">
                                <img src="/badges/cakebadge.png" alt="" aria-hidden="true" className="feature-section-4__title-badge-icon-cake" />
                                <span className="feature-section-4__title-badge-text-art">art</span>
                            </span>
                            <span className="feature-section-4__title-badge-text-with">with</span>
                        </span> */}
                        <span>your inner</span>
                        <span>big back</span>
                    </h2>
                    <p className="feature-section-4__subtitle">
                        Don’t keep your creations hidden in your notes. Let others experience and try out your recipes. Cooking is better together.
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
