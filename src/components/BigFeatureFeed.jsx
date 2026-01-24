import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LuChefHat } from 'react-icons/lu'
import { FiSearch } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa'
import { FaEarthAmericas } from 'react-icons/fa6'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'
import './BigFeatureFeed.css'

function BigFeatureFeed() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [isFixed, setIsFixed] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [titleAnimated, setTitleAnimated] = useState(false)
    const runwayRef = useRef(null)
    const sectionRef = useRef(null)
    const titleContainerRef = useRef(null)
    const secondaryBoxesRef = useRef([])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Animate secondary title boxes when section comes into view
    useEffect(() => {
        if (titleAnimated || !titleContainerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !titleAnimated) {
                        setTitleAnimated(true)
                        observer.disconnect()

                        // Animate each secondary box to its final position
                        secondaryBoxesRef.current.forEach((box, index) => {
                            if (box) {
                                // Use mobile-specific data attributes if on mobile, else fallback to desktop
                                const isMobile = window.innerWidth <= 768
                                const finalLeft = isMobile && box.dataset.mobileFinalLeft ? box.dataset.mobileFinalLeft : box.dataset.finalLeft
                                const finalTop = isMobile && box.dataset.mobileFinalTop ? box.dataset.mobileFinalTop : box.dataset.finalTop
                                const finalRotate = isMobile && box.dataset.mobileFinalRotate ? box.dataset.mobileFinalRotate : box.dataset.finalRotate

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
                                        delay: index*0.02,
                                        ease: 'back.out(1.7)'
                                    }
                                )
                            }
                        })
                    }
                })
            },
            { threshold: 0.9 }
        )

        if (titleContainerRef.current) {
            observer.observe(titleContainerRef.current)
        }

        return () => observer.disconnect()
    }, [titleAnimated])

    useEffect(() => {
        const handleScroll = () => {
            if (!runwayRef.current || !sectionRef.current) return

            const runway = runwayRef.current
            const runwayRect = runway.getBoundingClientRect()
            const windowHeight = window.innerHeight
            const lockOffset = isMobile ? 0 : 0 // 3rem on mobile, 0 on desktop

            // Lock when mockup top is 2rem from viewport top
            const shouldLock = runwayRect.top <= lockOffset && runwayRect.bottom >= windowHeight + lockOffset

            if (runwayRect.top > lockOffset) {
                // Not there yet
                setIsFixed(false)
                setScrollProgress(0)
            } else if (shouldLock) {
                // Lock the mockup
                setIsFixed(true)

                // Calculate scroll progress for content
                const scrolled = Math.abs(runwayRect.top - lockOffset)
                const totalScrollDistance = runwayRect.height - windowHeight - lockOffset

                const progress = Math.min(1, Math.max(0, scrolled / totalScrollDistance))
                setScrollProgress(progress)
            } else if (runwayRect.bottom < windowHeight + lockOffset) {
                // Animation complete, unlock
                setIsFixed(false)
                setScrollProgress(1)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        handleScroll() // Initial check

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Calculate how much to translate the content
    const calculateContentTransform = () => {
        // Each card is roughly 600px tall, 5 cards = 3000px total scroll distance
        const isMobile = window.innerWidth <= 768
        const totalContentHeight = isMobile ? 910 : 1715
        const translateY = -scrollProgress * totalContentHeight

        return {
            transform: `translateY(${translateY}px)`,
        }
    }

    const contentStyle = calculateContentTransform()
    const sectionClasses = `feed-scroll-section ${isFixed ? 'fixed' : ''} ${!isFixed && scrollProgress === 1 ? 'completed' : ''}`
    return (
        <>
            <div className="section-header-feed">
                <div className="feed-title-container" ref={titleContainerRef}>
                    <span 
                        ref={el => secondaryBoxesRef.current[0] = el}
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
                        ref={el => secondaryBoxesRef.current[1] = el}
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
                        ref={el => secondaryBoxesRef.current[2] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 3, opacity: 0 }}
                        data-final-left="24%"
                        data-final-top="-2%"
                        data-final-rotate="-20"
                        data-mobile-final-left="12%"
                        data-mobile-final-top="4%"
                        data-mobile-final-rotate="-8"
                    >teriyaki</span>

                    <div className="feed-title-row">
                        <span className="feed-title-box" style={{ transform: 'rotate(-4deg)' }}>discover</span>
                        <span className="feed-title-box" style={{ transform: 'rotate(3deg)' }}>your</span>
                        <span className="feed-title-box" style={{ transform: 'rotate(-2deg)' }}>personalized</span>
                        <span className="feed-title-box" style={{ transform: 'rotate(2deg)' }}>feed</span>
                    </div>

                    <span 
                        ref={el => secondaryBoxesRef.current[3] = el}
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
                        ref={el => secondaryBoxesRef.current[4] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="84%"
                        data-final-top="52%"
                        data-final-rotate="-10"
                        data-mobile-final-left="84%"
                        data-mobile-final-top="50%"
                        data-mobile-final-rotate="7"
                    >tacos</span>
                    <span 
                        ref={el => secondaryBoxesRef.current[5] = el}
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
                        ref={el => secondaryBoxesRef.current[6] = el}
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
                        ref={el => secondaryBoxesRef.current[7] = el}
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
                        ref={el => secondaryBoxesRef.current[8] = el}
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
                        ref={el => secondaryBoxesRef.current[9] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="9%"
                        data-final-top="80%"
                        data-final-rotate="9"
                        data-mobile-final-left="12%"
                        data-mobile-final-top="83%"
                        data-mobile-final-rotate="12"
                    >curry</span>
                    <span 
                        ref={el => secondaryBoxesRef.current[10] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="63%"
                        data-final-top="87%"
                        data-final-rotate="19"
                        data-mobile-final-left="-3%"
                        data-mobile-final-top="50%"
                        data-mobile-final-rotate="10"
                    >pizza</span>
                    <span 
                        ref={el => secondaryBoxesRef.current[11] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 3, opacity: 0 }}
                        data-final-left="3%"
                        data-final-top="53%"
                        data-final-rotate="-11"
                        data-mobile-final-left="5%"
                        data-mobile-final-top="68%"
                        data-mobile-final-rotate="15"
                    >burgers</span>
                    <span 
                        ref={el => secondaryBoxesRef.current[12] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 1, opacity: 0 }}
                        data-final-left="45%"
                        data-final-top="85%"
                        data-final-rotate="-7"
                        data-mobile-final-left="68%"
                        data-mobile-final-top="85%"
                        data-mobile-final-rotate="-5"
                    >pasta</span>
                    <span 
                        ref={el => secondaryBoxesRef.current[13] = el}
                        className="feed-title-box-secondary" 
                        style={{ zIndex: 2, opacity: 0 }}
                        data-final-left="25%"
                        data-final-top="86%"
                        data-final-rotate="-12"
                        data-mobile-final-left="35%"
                        data-mobile-final-top="89%"
                        data-mobile-final-rotate="-7"
                    >comfort</span>
                </div>
            </div>

            {/* Scrolling Phone Mockup Section */}
            <div className="feed-runway" ref={runwayRef}>
                <div className={sectionClasses} ref={sectionRef}>
                    <div className="feed-mockup-container">
                        {/* Scrolling content behind the frame */}
                        <div className="phone-screen-content" style={contentStyle}>
                            <div className="content-card card-1">
                                <img src="mockups/homemockup3.png" alt="Home Screen" className="card-image" />
                            </div>
                            <div className="content-card card-2">
                                <div className="card-box-2">
                                    <div className="card-title-boxes">
                                        <span className="card-title-box">cook</span>
                                        <span className="card-title-box">up</span>
                                        <span className="card-title-box">inspiration</span>
                                    </div>
                                    <img src="images/findnewrecipes.png" alt="Find new recipes" />
                                </div>
                            </div>
                            <div className="content-card card-3">
                                <div className="card-box-3">
                                    <div className="card-title-boxes">
                                        <span className="card-title-box">focus</span>
                                        <span className="card-title-box">on</span>
                                        <span className="card-title-box">friends</span>
                                    </div>
                                    <img src="images/focusonfriends.png" alt="Focus on Friends" />
                                </div>
                            </div>
                            <div className="content-card card-4">
                                <div className="card-box-4">
                                    <div className="card-title-boxes">
                                        <span className="card-title-box">meet</span>
                                        <span className="card-title-box">your</span>
                                        <span className="card-title-box">community</span>
                                    </div>
                                    <img src="images/meetyourcommunity.png" alt="Meet Your Community" />
                                </div>
                            </div>
                            <div className="content-card card-5">
                                <div className="card-box-5">
                                    <div className="card-title-boxes">
                                        <span className="card-title-box">share</span>
                                        <span className="card-title-box">your</span>
                                        <span className="card-title-box">recipes</span>
                                    </div>
                                    <img src="images/shareyourrecipes.png" alt="Share Your Recipes" />
                                </div>
                            </div>
                        </div>
                        {/* iPhone frame overlay */}
                        <img 
                            src={isMobile ? "mockups/phoneframemobile.png" : "mockups/phoneframe.png"} 
                            alt="iPhone Frame" 
                            className="phone-frame" 
                        />
                    </div>
                </div>

            </div>
        </>
    )
}

export default BigFeatureFeed
