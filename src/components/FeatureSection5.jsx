import './FeatureSection5.css'

function getCardStyle(card) {
    const media = card.media ?? {}

    return {
        '--card-subtitle-max-width': card.subtitleMaxWidth ?? '30rem',
        '--card-media-padding-top': media.paddingTop ?? media.padding ?? '1rem',
        '--card-media-padding-right': media.paddingRight ?? media.padding ?? '1.7rem',
        '--card-media-padding-bottom': media.paddingBottom ?? media.padding ?? '0',
        '--card-media-padding-left': media.paddingLeft ?? media.padding ?? '1.7rem',
        '--card-media-width': media.width ?? '100%',
        '--card-media-height': media.height ?? 'auto',
        '--card-media-max-width': media.maxWidth ?? 'none',
        '--card-media-max-height': media.maxHeight ?? '100%',
        '--card-media-object-fit': media.objectFit ?? 'contain',
        '--card-media-object-position': media.objectPosition ?? 'bottom center',
    }
}

const cardRows = [
    {
        id: 'row-1',
        variant: 'large-first',
        cards: [
            {
                id: 'collections',
                title: 'collections',
                subtitle:
                    'Instead of losing your recipes across various apps, munch lets you consolidate them all into a single app. Gather everything you need and organize them into collections.',
                image: '/mockups/collectionsmockup.png',
                subtitleMaxWidth: '50ch',
                media: {
                    paddingTop: '0rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    width: '100%',
                    maxHeight: '94%',
                },
            },
            {
                id: 'explore',
                title: 'explore',
                subtitle: 'Discover recipes by scrolling or delve deeper into specific food categories',
                image: '/mockups/exploremockup.png',
                subtitleMaxWidth: '28ch',
                media: {
                    paddingTop: '1.25rem',
                    paddingLeft: '1.25rem',
                    paddingRight: '1.25rem',
                    width: '100%',
                    maxHeight: '100%',
                },
            },
        ],
    },
    {
        id: 'row-2',
        variant: 'large-second',
        cards: [
            {
                id: 'auto-recipe-formatter',
                title: 'auto recipe formattor',
                subtitle:
                    'Uploading your recipe has never been easier. Just paste your recipe onto Munch and it will auto format everything for you into individual ingredients and steps using AI.',
                video: '/mockups/autorecipeformatvideo.mp4',
                subtitleMaxWidth: '40ch',
                media: {
                    paddingTop: '1.5rem',
                    paddingLeft: '2rem',
                    paddingRight: '2rem',
                    width: '78%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                },
            },
            {
                id: 'earn-badges',
                title: 'earn badges & stickers',
                subtitle:
                    'Reach certain milestones and receive exclusive badges. Create your own stickers to express yourself',
                video: '/mockups/editprofilevideo.mp4',
                subtitleMaxWidth: '40ch',
                media: {
                    paddingTop: '0rem',
                    paddingLeft: '0rem',
                    paddingRight: '0rem',
                    width: '110%',
                    maxHeight: '100%',
                    objectFit: 'cover',
                    objectPosition: 'top center',
                },
            },
        ],
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
            <div className="feature-section-5__cards" aria-label="Feature cards">
                {cardRows.map((row) => (
                    <div
                        key={row.id}
                        className={`feature-section-5__cards-row feature-section-5__cards-row--${row.variant}`}
                    >
                        {row.cards.map((card) => (
                            <article
                                key={card.id}
                                className="feature-section-5__feature-card"
                                style={getCardStyle(card)}
                            >
                                <div className="feature-section-5__feature-card-copy">
                                    <div className="feature-section-5__feature-card-pill">{card.title}</div>
                                    <p className="feature-section-5__feature-card-subtitle">{card.subtitle}</p>
                                </div>
                                <div className="feature-section-5__feature-card-media-wrap">
                                    {card.image && (
                                        <img
                                            src={card.image}
                                            alt={card.title}
                                            className="feature-section-5__feature-card-image"
                                        />
                                    )}
                                    {card.video && (
                                        <video
                                            className="feature-section-5__feature-card-video"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={card.video} type="video/mp4" />
                                        </video>
                                    )}
                                </div>
                                <div className="feature-section-5__feature-card-gradient" aria-hidden="true" />
                            </article>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeatureSection5
