import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './BigFeature.css'
import ImmersiveFeature from './ImmersiveFeature'
import BigFeatureFeed from './BigFeatureFeed'
import CameraIcon from "@/components/ui/camera-icon";
import BounceCards from './BounceCards';

function BigFeature() {
    const [sparklesAnimated, setSparklesAnimated] = useState(false)
    const cameraContainerRef = useRef(null)
    const sparklesRef = useRef([])

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

    // Animate sparkles when section comes into view
    useEffect(() => {
        if (sparklesAnimated || !cameraContainerRef.current) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !sparklesAnimated) {
                        setSparklesAnimated(true)
                        observer.disconnect()

                        // Animate each sparkle to its final position
                        sparklesRef.current.forEach((sparkle, index) => {
                            if (sparkle) {
                                const isMobile = window.innerWidth <= 768
                                let finalLeft, finalRight, finalTop, finalBottom, finalRotate, finalScale

                                if (isMobile) {
                                    const styles = getComputedStyle(sparkle)
                                    finalLeft = styles.getPropertyValue('--mobile-final-left').trim() || sparkle.dataset.finalLeft
                                    finalRight = styles.getPropertyValue('--mobile-final-right').trim() || sparkle.dataset.finalRight
                                    finalTop = styles.getPropertyValue('--mobile-final-top').trim() || sparkle.dataset.finalTop
                                    finalBottom = styles.getPropertyValue('--mobile-final-bottom').trim() || sparkle.dataset.finalBottom
                                    const rotateStr = styles.getPropertyValue('--mobile-final-rotate').trim()
                                    finalRotate = rotateStr ? rotateStr.replace('deg', '') : sparkle.dataset.finalRotate
                                    finalScale = styles.getPropertyValue('--mobile-final-scale').trim() || sparkle.dataset.finalScale
                                } else {
                                    finalLeft = sparkle.dataset.finalLeft
                                    finalRight = sparkle.dataset.finalRight
                                    finalTop = sparkle.dataset.finalTop
                                    finalBottom = sparkle.dataset.finalBottom
                                    finalRotate = sparkle.dataset.finalRotate
                                    finalScale = sparkle.dataset.finalScale
                                }

                                const animationProps = {
                                    xPercent: 0,
                                    yPercent: 0,
                                    rotation: parseFloat(finalRotate),
                                    scale: parseFloat(finalScale),
                                    opacity: 1,
                                    duration: 0.8,
                                    delay: index * 0.08,
                                    ease: 'back.out(1.7)'
                                }

                                // Set left or right
                                if (finalLeft) animationProps.left = finalLeft
                                if (finalRight) animationProps.right = finalRight

                                // Set top or bottom
                                if (finalTop) animationProps.top = finalTop
                                if (finalBottom) animationProps.bottom = finalBottom

                                gsap.fromTo(
                                    sparkle,
                                    {
                                        left: '50%',
                                        top: '50%',
                                        xPercent: -50,
                                        yPercent: -50,
                                        rotation: 0,
                                        scale: 0,
                                        opacity: 0
                                    },
                                    animationProps
                                )
                            }
                        })
                    }
                })
            },
            { threshold: 0.8 }
        )

        if (cameraContainerRef.current) {
            observer.observe(cameraContainerRef.current)
        }

        return () => observer.disconnect()
    }, [sparklesAnimated])

    return (
        <>
            {/* AI CAMERA SECTION */}
            <div className="section-header-dark-section-top">
                {typeof window !== 'undefined' && window.innerWidth <= 768 ? (
                    <h1 className="section-title-dark-section-top" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2em' }}>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.3em', justifyContent: 'center', width: '100%' }}>
                            <span className="dark-section-title-box" style={{ transform: 'rotate(4deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>your</span>
                            <span className="dark-section-title-box" style={{ transform: 'rotate(-3deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>camera</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '0.3em', justifyContent: 'center', width: '100%' }}>
                            <CameraIcon size={55} color="#214221" className="mt-[-3px] ml-[0px] mr-[0px] " />
                            <span className="dark-section-title-box" style={{ transform: 'rotate(3deg)', display: 'inline-block', color: '#ffffff', backgroundColor: '#6ed26e' }}>upgraded</span>
                        </div>
                    </h1>
                ) : (
                    <h1 className="section-title-dark-section-top">
                        <span className="dark-section-title-box" style={{ transform: 'rotate(5deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>your</span>
                        {' '}
                        <span className="dark-section-title-box" style={{ transform: 'rotate(-4deg)', display: 'inline-block', backgroundColor: '#ffffff' }}>camera,</span>
                        <CameraIcon size={120} color="#214221" className="mb-[-24px] ml-[28px] mr-[5px] " />
                        {' '}
                        <span className="dark-section-title-box" style={{ transform: 'rotate(5deg)', display: 'inline-block', color: '#ffffff', backgroundColor: '#6ed26e' }}>upgraded</span>
                    </h1>
                )}
            </div>
            {/* IMMERSIVE FEATURE SECTION */}
            <ImmersiveFeature />

            {/* RADIAL GRADIENT DECORATION */}
            <svg className="radial-gradient-decoration" xmlns="http://www.w3.org/2000/svg" width="1568" height="1003" viewBox="0 0 1568 1003" fill="none">
                <g filter="url(#filter0_n_809_35)">
                    <g clipPath="url(#paint0_diamond_809_35_clip_path)" data-figma-skip-parse="true">
                        <g transform="matrix(3.33275e-08 -0.5125 3.01975 1.96372e-07 784 531)">
                            <rect x="0" y="0" width="1036.1" height="259.624" fill="url(#paint0_diamond_809_35)" opacity="1" shapeRendering="crispEdges" />
                            <rect x="0" y="0" width="1036.1" height="259.624" transform="scale(1 -1)" fill="url(#paint0_diamond_809_35)" opacity="1" shapeRendering="crispEdges" />
                            <rect x="0" y="0" width="1036.1" height="259.624" transform="scale(-1 1)" fill="url(#paint0_diamond_809_35)" opacity="1" shapeRendering="crispEdges" />
                            <rect x="0" y="0" width="1036.1" height="259.624" transform="scale(-1)" fill="url(#paint0_diamond_809_35)" opacity="1" shapeRendering="crispEdges" />
                        </g>
                    </g>
                    <rect width="1568" height="1003" data-figma-gradient-fill="{&quot;type&quot;:&quot;GRADIENT_DIAMOND&quot;,&quot;stops&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.90489780902862549,&quot;g&quot;:0.88989263772964478,&quot;b&quot;:0.45474311709403992,&quot;a&quot;:0.87999999523162842},&quot;position&quot;:0.13942307233810425},{&quot;color&quot;:{&quot;r&quot;:0.014114090241491795,&quot;g&quot;:0.58259463310241699,&quot;b&quot;:0.080436833202838898,&quot;a&quot;:0.28999999165534973},&quot;position&quot;:0.67307692766189575},{&quot;color&quot;:{&quot;r&quot;:0.90196079015731812,&quot;g&quot;:0.96078431606292725,&quot;b&quot;:0.89019608497619629,&quot;a&quot;:0.31000000238418579},&quot;position&quot;:1.0}],&quot;stopsVar&quot;:[{&quot;color&quot;:{&quot;r&quot;:0.90489780902862549,&quot;g&quot;:0.88989263772964478,&quot;b&quot;:0.45474311709403992,&quot;a&quot;:0.87999999523162842},&quot;position&quot;:0.13942307233810425},{&quot;color&quot;:{&quot;r&quot;:0.014114090241491795,&quot;g&quot;:0.58259463310241699,&quot;b&quot;:0.080436833202838898,&quot;a&quot;:0.28999999165534973},&quot;position&quot;:0.67307692766189575},{&quot;color&quot;:{&quot;r&quot;:0.90196079015731812,&quot;g&quot;:0.96078431606292725,&quot;b&quot;:0.89019608497619629,&quot;a&quot;:0.31000000238418579},&quot;position&quot;:1.0}],&quot;transform&quot;:{&quot;m00&quot;:6.6654938564170152e-05,&quot;m01&quot;:6039.503906250,&quot;m02&quot;:-2235.7521972656250,&quot;m10&quot;:-1025.0,&quot;m11&quot;:0.00039274411392398179,&quot;m12&quot;:1043.4998779296875},&quot;opacity&quot;:1.0,&quot;blendMode&quot;:&quot;NORMAL&quot;,&quot;visible&quot;:true}" />
                </g>
                <defs>
                    <filter id="filter0_n_809_35" x="0" y="0" width="1568" height="1003" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                        <feTurbulence type="fractalNoise" baseFrequency="2 2" stitchTiles="stitch" numOctaves="3" result="noise" seed="4929" />
                        <feColorMatrix in="noise" type="luminanceToAlpha" result="alphaNoise" />
                        <feComponentTransfer in="alphaNoise" result="coloredNoise1">
                            <feFuncA type="discrete" tableValues="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 " />
                        </feComponentTransfer>
                        <feComposite operator="in" in2="shape" in="coloredNoise1" result="noise1Clipped" />
                        <feFlood floodColor="rgba(0, 0, 0, 0.04)" result="color1Flood" />
                        <feComposite operator="in" in2="noise1Clipped" in="color1Flood" result="color1" />
                        <feMerge result="effect1_noise_809_35">
                            <feMergeNode in="shape" />
                            <feMergeNode in="color1" />
                        </feMerge>
                    </filter>
                    <clipPath id="paint0_diamond_809_35_clip_path">
                        <rect width="1568" height="1003" />
                    </clipPath>
                    <linearGradient id="paint0_diamond_809_35" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
                        <stop offset="0.139423" stopColor="#E7E374" stopOpacity="0.88" />
                        <stop offset="0.673077" stopColor="#049515" stopOpacity="0.29" />
                        <stop offset="1" stopColor="#E6F5E3" stopOpacity="0.31" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="section-header-camera" ref={cameraContainerRef}>
                {/* Sparkle SVGs */}
                <svg
                    ref={el => sparklesRef.current[0] = el}
                    className="camera-sparkle camera-sparkle-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="18%"
                    data-final-top="37%"
                    data-final-rotate="2"
                    data-final-scale="1"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>

                <svg
                    ref={el => sparklesRef.current[1] = el}
                    className="camera-sparkle camera-sparkle-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="23%"
                    data-final-top="18%"
                    data-final-rotate="24.264"
                    data-final-scale="1.3"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>

                <svg
                    ref={el => sparklesRef.current[2] = el}
                    className="camera-sparkle camera-sparkle-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="27%"
                    data-final-bottom="11%"
                    data-final-rotate="-5.673"
                    data-final-scale="2.2"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>

                <div className="camera-title-container">
                    <span className="camera-title-box" style={{ transform: 'rotate(-3deg)', display: 'inline-block' }}>AI-powered</span>
                    {' '}
                    <span className="camera-title-box" style={{ transform: 'rotate(3deg)', display: 'inline-block' }}>camera</span>
                </div>

                <svg
                    ref={el => sparklesRef.current[3] = el}
                    className="camera-sparkle camera-sparkle-3"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="71%"
                    data-final-top="29%"
                    data-final-rotate="20"
                    data-final-scale="2.2"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>

                <svg
                    ref={el => sparklesRef.current[4] = el}
                    className="camera-sparkle camera-sparkle-4"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="65%"
                    data-final-top="55%"
                    data-final-rotate="25"
                    data-final-scale="1.3"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>

                <svg
                    ref={el => sparklesRef.current[5] = el}
                    className="camera-sparkle camera-sparkle-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="131"
                    height="131"
                    viewBox="0 0 131 131"
                    fill="none"
                    style={{ opacity: 0 }}
                    data-final-left="78%"
                    data-final-top="39%"
                    data-final-rotate="8"
                    data-final-scale="1"
                >
                    <path d="M79.706 78.5487L79.1938 90.1633C78.8308 98.3966 78.6492 102.513 77.166 103.906C75.8855 105.108 74.068 105.55 72.3783 105.07C70.4212 104.515 68.3689 100.942 64.2644 93.7952L58.4742 83.7139C57.6742 82.3211 57.2743 81.6247 56.7172 81.108C56.2241 80.6506 55.6439 80.2975 55.0111 80.0696C54.2963 79.8121 53.494 79.7767 51.8894 79.706L40.2748 79.1938C32.0415 78.8308 27.9249 78.6492 26.5324 77.1661C25.3301 75.8855 24.888 74.068 25.3677 72.3783C25.9232 70.4212 29.4965 68.3689 36.6429 64.2644L46.7243 58.4742C48.117 57.6743 48.8134 57.2743 49.3301 56.7172C49.7875 56.2242 50.1407 55.6439 50.3686 55.0111C50.626 54.2963 50.6614 53.494 50.7321 51.8894L51.2443 40.2748C51.6074 32.0415 51.7889 27.9249 53.2721 26.5324C54.5526 25.3301 56.3701 24.888 58.0598 25.3677C60.0169 25.9232 62.0692 29.4965 66.1737 36.6429L66.1738 36.6429L71.9639 46.7243C72.7639 48.1171 73.1639 48.8134 73.7209 49.3302C74.214 49.7875 74.7942 50.1407 75.427 50.3686C76.1418 50.626 76.9441 50.6614 78.5487 50.7322L90.1633 51.2443C98.3966 51.6074 102.513 51.7889 103.906 53.2721C105.108 54.5526 105.55 56.3701 105.07 58.0599C104.515 60.0169 100.942 62.0692 93.7952 66.1738L83.7138 71.964C82.3211 72.7639 81.6247 73.1639 81.108 73.7209C80.6506 74.214 80.2974 74.7943 80.0696 75.427C79.8121 76.1419 79.7767 76.9441 79.706 78.5487Z" stroke="white" strokeWidth="3" />
                    <path d="M79.9965 76.9371L78.8246 100.327C78.5801 105.207 72.2005 106.875 69.5987 102.739L56.8241 82.432C55.9774 81.0861 54.5411 80.2231 52.9552 80.1076L29.676 78.4114C24.831 78.0584 23.2844 71.7012 27.4258 69.162L47.3012 56.9762C48.6698 56.137 49.5523 54.6918 49.6734 53.091L51.4172 30.0537C51.7828 25.224 58.1149 23.6836 60.6582 27.8056L72.785 47.46C73.6305 48.8304 75.0843 49.7097 76.6907 49.8223L100.149 51.4662C105.009 51.8068 106.561 58.1887 102.401 60.7238L82.3886 72.9175C80.975 73.7788 80.0793 75.2839 79.9965 76.9371Z" fill="white" />
                </svg>
            </div>

            <BounceCards
                features={features}
                animationDelay={0.6}
                animationStagger={0.08}
                easeType="elastic.out(1, 0.8)"
            />
            <BigFeatureFeed />
        </>
    )
}

export default BigFeature
