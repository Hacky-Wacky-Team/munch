import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Camera.css'
import DrawUnderline from '@/components/ui/DrawUnderline'
import ImmersiveFeature from './ImmersiveFeature'
import BounceCards from './BounceCards';

function Camera() {
    const [isMobile, setIsMobile] = useState(false)
    const [feedTitleAnimated, setFeedTitleAnimated] = useState(false)
    const [cameraFocusScale, setCameraFocusScale] = useState(1)
    const cameraSectionRef = useRef(null)
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

    // Scroll-linked camera focus zoom: starts larger, shrinks to normal on scroll down.
    useEffect(() => {
        if (!cameraSectionRef.current) return

        let rafId = null

        const updateFocusScale = () => {
            rafId = null

            const rect = cameraSectionRef.current.getBoundingClientRect()
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight

            const start = viewportHeight * 0.92
            const end = viewportHeight * 0.35
            const rawProgress = (start - rect.top) / (start - end)
            const progress = Math.max(0, Math.min(1, rawProgress))

            const maxScale = window.innerWidth <= 768 ? 1.18 : 1.52
            const minScale = 1
            const scale = maxScale - ((maxScale - minScale) * progress)

            setCameraFocusScale(scale)
        }

        const onScrollOrResize = () => {
            if (rafId !== null) return
            rafId = requestAnimationFrame(updateFocusScale)
        }

        updateFocusScale()
        window.addEventListener('scroll', onScrollOrResize, { passive: true })
        window.addEventListener('resize', onScrollOrResize)

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId)
            }
            window.removeEventListener('scroll', onScrollOrResize)
            window.removeEventListener('resize', onScrollOrResize)
        }
    }, [isMobile])

    return (
        <>
            {/* AI CAMERA SECTION */}
            <div className="camera-section" ref={cameraSectionRef}>
                <div className="camera-pill">
                    <span className="camera-pill-text">YOUR CAMERA APP</span>
                </div>
                <h2 className="camera-title">Find recipes <DrawUnderline>faster</DrawUnderline> with the</h2>
                <div
                    className="ai-camera-title-container"
                    style={{ '--camera-focus-scale': cameraFocusScale }}
                >
                    <img src="images/sparkle.svg" alt="Sparkle icon" className="sparkle-icon" />
                    <h2 className="ai-camera-title">AI Camera</h2>
                </div>
            </div>
            {/* IMMERSIVE FEATURE SECTION */}
            <ImmersiveFeature />
            <div className="camera-section" style={{ marginBottom: isMobile ? '-3.5rem' : '0' }}>
                <h2 className="camera-title" style={{ fontSize: isMobile ? '2.8rem' : '4.2rem', color: '#152b15', marginTop: '3rem' }}>
                    Stress <DrawUnderline>less</DrawUnderline>,{isMobile && <br />} <span style={{ color: '#b0c6b0' }}>let AI handle it</span>
                </h2>
            </div>
            <BounceCards
                features={features}
                animationDelay={0.6}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
            />
        </>
    )
}

export default Camera
