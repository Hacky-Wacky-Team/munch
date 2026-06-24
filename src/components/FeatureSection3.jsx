import { useEffect, useRef, useState } from 'react'
import './FeatureSection3.css'

const featureCards = [
    {
        id: 'ingredient-checklist',
        image: '/mockups/ingredientchecklistmockup.png',
        title: 'ingredient checklist',
    },
    {
        id: 'step-by-step-instructions',
        image: '/mockups/stepinstructionsmockup.png',
        title: 'step by step instructions',
    },
    {
        id: 'meal-plan',
        image: '/mockups/mealplanmockup.png',
        title: 'plan your meals',
        subtitle: 'coming soon',
    },
]

function FeatureSection3() {
    const sectionRef = useRef(null)
    const [isInView, setIsInView] = useState(false)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.4 },
        )

        observer.observe(section)
        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className={`feature-section-3${isInView ? ' feature-section-3--in-view' : ''}`}
            aria-label="Feature section 3"
        >
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
                        From ingredient checklists to step-by-step guidance and meal planning, everything you need to stay organized and spend less time figuring out what’s for dinner.
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

            <div className="feature-section-3__cards-row" aria-label="Feature cards">
                {featureCards.map((card) => (
                    <article key={card.id} className="feature-section-3__feature-card">
                        <div className="feature-section-3__feature-card-copy">
                            {card.subtitle && <div className="feature-section-3__feature-card-subtitle">{card.subtitle}</div>}
                            <div className="feature-section-3__feature-card-pill">{card.title}</div>
                        </div>
                        <div className="feature-section-3__feature-card-image-wrap">
                            <img src={card.image} alt={card.title} className="feature-section-3__feature-card-image" />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default FeatureSection3
