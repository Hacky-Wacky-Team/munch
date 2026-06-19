import './FeatureSection5.css'

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
]

function FeatureSection5() {
    return (
        <section className="feature-section-5" aria-label="Feature section 5">
            <div className="feature-section-5__inner">
                <h2 className="feature-section-5__title" aria-label="Share your art with the world">
                    and so much more...
                </h2>
            </div>
            <div className="feature-section-5__cards-row" aria-label="Feature cards">
                {featureCards.map((card) => (
                    <article key={card.id} className="feature-section-5__feature-card">
                        <div className="feature-section-5__feature-card-copy">
                            {card.subtitle && <div className="feature-section-5__feature-card-subtitle">{card.subtitle}</div>}
                            <div className="feature-section-5__feature-card-pill">{card.title}</div>
                        </div>
                        <div className="feature-section-5__feature-card-image-wrap">
                            <img src={card.image} alt={card.title} className="feature-section-5__feature-card-image" />
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}

export default FeatureSection5
