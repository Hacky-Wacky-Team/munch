import './FeatureSection3.css'

function FeatureSection3() {
    return (
        <section className="feature-section-3" aria-label="Feature section 3">
            <div className="feature-section-3__inner">
                <div className="feature-section-3__copy">
                    <h2 className="feature-section-3__title" aria-label="Share your art with the world">
                        <span>Tools built</span>
                        <span>to get you</span>
                        <span className="feature-section-3__title-line">
                            <span className="feature-section-3__title-badge">
                                <span className="feature-section-3__title-badge-text-cooking">cooking</span>
                                <img src="/badges/ogbadge.png" alt="" aria-hidden="true" className="feature-section-3__title-badge-icon-og" />
                            </span>
                        </span>
                    </h2>
                    <p className="feature-section-3__subtitle">
                        Don’t keep your creations hidden in your notes. Let others experience and try out your recipes. Cooking is better together.
                    </p>
                </div>

                <div className="feature-section-3__mockup-shell" aria-label="Recipe mockup preview">
                    <div className="feature-section-3__mockup-card">
                        <video
                            className="feature-section-3__mockup-video"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                        >
                            <source src="/mockups/recipevideo.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeatureSection3
