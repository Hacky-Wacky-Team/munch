import { useEffect, useRef, useState } from 'react'
import './FeatureSection2.css'

function FeatureSection2() {
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
            className={`feature-section-2${isInView ? ' feature-section-2--in-view' : ''}`}
            aria-label="Feature section 2"
        >
            <div className="feature-section-2__inner">
                <div className="feature-section-2__copy">
                    <h2 className="feature-section-2__title" aria-label="Share your art with the world">
                        <span>Share your</span>
                        <span className="feature-section-2__title-line">
                            <span className="feature-section-2__title-badge">
                                <img src="/badges/cakebadge.png" alt="" aria-hidden="true" className="feature-section-2__title-badge-icon-cake" />
                                <span className="feature-section-2__title-badge-text-art">art</span>
                            </span>
                            <span className="feature-section-2__title-badge-text-with">with</span>
                        </span>
                        <span>the world</span>
                    </h2>
                    <p className="feature-section-2__subtitle">
                        Don’t keep your creations hidden in your notes. Turn your favorite dishes into posts worth sharing. Publish recipes, showcase your creations, and inspire cooks around the globe.
                    </p>
                </div>

                <div className="feature-section-2__mockup-shell" aria-label="Recipe mockup preview">
                    <div className="feature-section-2__mockup-card">
                        <img
                            src="/mockups/feature2mockup.png"
                            alt="Munch feature preview"
                            className="feature-section-2__mockup-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeatureSection2
