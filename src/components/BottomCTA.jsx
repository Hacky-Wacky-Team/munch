import DrawUnderline from '@/components/ui/DrawUnderline'
import './BottomCTA.css'

function BottomCTA({
    name,
    email,
    isSubmitting,
    onNameChange,
    onEmailChange,
    onSubmit,
    onGoogleSignup
}) {
    const goToWebsite = () => {
        window.location.href = "https://apps.apple.com/us/app/munch-your-social-recipe-app/id6767927842"
    }

    return (
        <section className="bottom-cta" aria-label="Get the app">
            <div className="hero-background bottom-cta-hero-background" aria-hidden="true">
                <img src="/herostars/star7.svg" className="hero-star hero-star-7" alt="" />
                <img src="/herostars/star6.svg" className="hero-star hero-star-6" alt="" />
                <img src="/herostars/star5.svg" className="hero-star hero-star-5" alt="" />
                <img src="/herostars/star4.svg" className="hero-star hero-star-4" alt="" />
                <img src="/herostars/star3.svg" className="hero-star hero-star-3" alt="" />
                <img src="/herostars/star2.svg" className="hero-star hero-star-2" alt="" />
                <img src="/herostars/star1.svg" className="hero-star hero-star-1" alt="" />
            </div>

            <div className="hero-bottom-container bottom-cta-fade bottom-cta-fade--top" aria-hidden="true" />
            <div className="hero-bottom-container bottom-cta-fade bottom-cta-fade--bottom" aria-hidden="true" />

            <div className="bottom-cta-content">
                <div className="section-header-bottom-cta">
                    <h2 className='feature-title-bottom-cta'>Ready to <DrawUnderline>munch</DrawUnderline>?</h2>
                </div>

                <div className="bottom-cta-button-container">
                    <button className="bottom-cta-button" type="button" onClick={goToWebsite}>
                        <img src="/herostars/applelogo.svg" alt="Apple" className="bottom-cta-button-icon" />
                        Get the app
                    </button>
                </div>
            </div>
        </section>
    )
}

export default BottomCTA
