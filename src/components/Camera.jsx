import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Camera.css'
import DrawUnderline from '@/components/ui/DrawUnderline'
import ImmersiveFeature from './ImmersiveFeature'
import BounceCards from './BounceCards';

function Camera() {
    const [isMobile, setIsMobile] = useState(false)
    const [feedTitleAnimated, setFeedTitleAnimated] = useState(false)
    const feedTitleContainerRef = useRef(null)
    const feedSecondaryBoxesRef = useRef([])

    const features = [
        {
            title: 'Ingredient Recognition',
            description: 'Our AI model intelligently recognizes the ingredients in your image, allowing you to effortlessly determine recipes that work for you.',
            image: 'images/ingredientrecognition.svg'
        },
        {
            title: 'Personalized Recipes',
            description: 'Using the recognized ingredients, we tailor your recipes to what you have at the moment. No more missing ingredients.',
            image: 'images/findnewrecipes.png'
        },
        {
            title: 'Zero-waste Cooking',
            description: 'Got random ingredients at the end of the week? Munch can help you use them up in a single recipe so you can reduce food waste.',
            image: 'images/zerowastecooking.svg'
        },
        {
            title: 'AI-Powered Magic',
            description: 'We use the latest AI vision models for the most accurate image recognition, powering a smarter recipe discovery.',
            image: 'images/aipoweredmagic.svg'
        }
    ];

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Animate feed secondary title boxes when section comes into view
    useEffect(() => {
        if (feedTitleAnimated || !feedTitleContainerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !feedTitleAnimated) {
                        setFeedTitleAnimated(true)
                        observer.disconnect()

                        feedSecondaryBoxesRef.current.forEach((box, index) => {
                            if (box) {
                                const isMobile = window.innerWidth <= 768
                                const finalLeft = isMobile && box.dataset.mobileFinalLeft ? box.dataset.mobileFinalLeft : box.dataset.finalLeft
                                const finalTop = isMobile && box.dataset.mobileFinalTop ? box.dataset.mobileFinalTop : box.dataset.finalTop
                                const finalRotate = isMobile && box.dataset.mobileFinalRotate ? box.dataset.mobileFinalRotate : box.dataset.finalRotate

                                // Defer animation to avoid forced reflow
                                requestAnimationFrame(() => {
                                    gsap.fromTo(
                                        box,
                                        {
                                            left: '50%',
                                            top: '50%',
                                            xPercent: -50,
                                            yPercent: -50,
                                            rotation: 0,
                                            opacity: 0
                                        },
                                        {
                                            left: finalLeft,
                                            top: finalTop,
                                            xPercent: 0,
                                            yPercent: 0,
                                            rotation: parseFloat(finalRotate),
                                            opacity: 1,
                                            duration: 0.7,
                                            delay: index * 0.02,
                                            ease: 'back.out(1.7)'
                                        }
                                    );
                                });
                            }
                        })
                    }
                })
            },
            { threshold: 0.9 }
        )

        if (feedTitleContainerRef.current) {
            observer.observe(feedTitleContainerRef.current)
        }

        return () => observer.disconnect()
    }, [feedTitleAnimated])

    return (
        <>
            {/* AI CAMERA SECTION */}
            <div className="camera-section">
                <div className="camera-pill">
                    <span className="camera-pill-text">CAMERA</span>
                </div>
                <h2 className="camera-title">Find recipes <DrawUnderline>faster</DrawUnderline> with the</h2>
                <div className="ai-camera-title-container">
                    <img src="images/sparkle.svg" alt="Sparkle icon" className="sparkle-icon" />
                    <h2 className="ai-camera-title">AI Camera</h2>
                </div>
            </div>
            {/* IMMERSIVE FEATURE SECTION */}
            <ImmersiveFeature />
            <BounceCards
                features={features}
                animationDelay={0.6}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
            />

            <div className="section-header-feed">
                <div className="feed-title-container" ref={feedTitleContainerRef}>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[0] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="5%"
                        data-final-top="0%"
                        data-final-rotate="-8"
                        data-mobile-final-left="5%"
                        data-mobile-final-top="34%"
                        data-mobile-final-rotate="-20"
                    >recipes</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[1] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="79%"
                        data-final-top="80%"
                        data-final-rotate="-20"
                        data-mobile-final-left="72%"
                        data-mobile-final-top="70%"
                        data-mobile-final-rotate="-10"
                    >chicken</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[2] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 3, opacity: 0 }}
                        data-final-left="24%"
                        data-final-top="-2%"
                        data-final-rotate="-20"
                        data-mobile-final-left="12%"
                        data-mobile-final-top="4%"
                        data-mobile-final-rotate="-8"
                    >teriyaki</span>

                    {isMobile ? (
                        <div className="feed-title-row">
                            <span className="feed-title-box" style={{ transform: 'rotate(-4deg)' }}>Apply</span>
                            <span className="feed-title-box" style={{ transform: 'rotate(3deg)' }}>countless</span>
                            <span className="feed-title-box" style={{ transform: 'rotate(-2deg)' }}><img src="images/filtericon.svg" alt="Filter icon" className="feed-title-box-icon" />filters</span>
                        </div>
                    ) : (
                        <div className="feed-title-row">
                            <span className="feed-title-box" style={{ transform: 'rotate(-4deg)' }}>Apply</span>
                            <span className="feed-title-box" style={{ transform: 'rotate(3deg)' }}>countless</span>
                            <span className="feed-title-box" style={{ transform: 'rotate(-2deg)' }}>filters</span>
                            <span className="feed-title-box" style={{ transform: 'rotate(2deg)' }}><img src="images/filtericon.svg" alt="Filter icon" className="feed-title-box-icon" /></span>
                        </div>
                    )}

                    <span
                        ref={el => feedSecondaryBoxesRef.current[3] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="10%"
                        data-final-top="25%"
                        data-final-rotate="9"
                        data-mobile-final-left="3%"
                        data-mobile-final-top="18%"
                        data-mobile-final-rotate="-12"
                    >sushi</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[4] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="74%"
                        data-final-top="55%"
                        data-final-rotate="-10"
                        data-mobile-final-left="78%"
                        data-mobile-final-top="50%"
                        data-mobile-final-rotate="7"
                    >tacos</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[5] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="80%"
                        data-final-top="27%"
                        data-final-rotate="8"
                        data-mobile-final-left="74%"
                        data-mobile-final-top="35%"
                        data-mobile-final-rotate="-7"
                    >10 min</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[6] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="42%"
                        data-final-top="1%"
                        data-final-rotate="10"
                        data-mobile-final-left="43%"
                        data-mobile-final-top="0%"
                        data-mobile-final-rotate="7"
                    >for kids</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[7] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="61%"
                        data-final-top="1%"
                        data-final-rotate="-6"
                        data-mobile-final-left="74%"
                        data-mobile-final-top="6%"
                        data-mobile-final-rotate="10"
                    >waffle</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[8] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="78%"
                        data-final-top="0%"
                        data-final-rotate="-18"
                        data-mobile-final-left="78%"
                        data-mobile-final-top="20%"
                        data-mobile-final-rotate="10"
                    >party</span>

                    <span
                        ref={el => feedSecondaryBoxesRef.current[9] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="9%"
                        data-final-top="82%"
                        data-final-rotate="9"
                        data-mobile-final-left="-50%"
                        data-mobile-final-top="83%"
                        data-mobile-final-rotate="12"
                    >curry</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[10] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="63%"
                        data-final-top="87%"
                        data-final-rotate="19"
                        data-mobile-final-left="3%"
                        data-mobile-final-top="50%"
                        data-mobile-final-rotate="10"
                    >pizza</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[11] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 3, opacity: 0 }}
                        data-final-left="11%"
                        data-final-top="57%"
                        data-final-rotate="-7"
                        data-mobile-final-left="5%"
                        data-mobile-final-top="68%"
                        data-mobile-final-rotate="15"
                    >burgers</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[12] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="45%"
                        data-final-top="85%"
                        data-final-rotate="-7"
                        data-mobile-final-left="159%"
                        data-mobile-final-top="83%"
                        data-mobile-final-rotate="-5"
                    >pasta</span>
                    <span
                        ref={el => feedSecondaryBoxesRef.current[13] = el}
                        className="feed-title-box-secondary"
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="25%"
                        data-final-top="86%"
                        data-final-rotate="-12"
                        data-mobile-final-left="39%"
                        data-mobile-final-top="71%"
                        data-mobile-final-rotate="-7"
                    >comfort</span>
                </div>
            </div>
        </>
    )
}

export default Camera
