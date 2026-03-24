import { useEffect, useRef, useState } from 'react'
import './Profile.css'
import DrawUnderline from '@/components/ui/DrawUnderline'

const STICKER_ASSETS = {
    boba: 'foodicons/boba.png',
    cake: 'foodicons/cake.png',
    pie: 'foodicons/pie.png',
    wavystarshape: 'images/wavystarshape.svg',
    greenbadge: 'images/greenbadge.svg',
    yellowbadge: 'images/yellowbadge.svg',
}

const PROFILES = [
    {
        id: 'alex',
        label: 'Alex',
        image: 'mockups/alexprofile.png',
        mobileImage: 'mockups/alexprofilemobile.png',
        stickers: [
            { id: 'alex-boba-1', asset: 'boba', x: 14, y: 34, size: 262, rotate: -14, z: 12, delay: 0 },
            { id: 'alex-boba-2', asset: 'boba', x: 84, y: 31, size: 166, rotate: 11, z: 12, delay: 80 },
            { id: 'alex-boba-3', asset: 'boba', x: 76, y: 78, size: 224, rotate: -8, z: 16, delay: 140 },
            { id: 'alex-star-1', asset: 'wavystarshape', x: 20, y: 82, size: 164, rotate: 7, z: 18, delay: 190 },
        ],
    },
    {
        id: 'eric',
        label: 'Eric',
        image: 'mockups/ericprofile.png',
        mobileImage: 'mockups/ericprofilemobile.png',
        stickers: [
            { id: 'eric-cake-1', asset: 'cake', x: 19, y: 38, size: 222, rotate: -12, z: 12, delay: 0 },
            { id: 'eric-cake-2', asset: 'cake', x: 80, y: 84, size: 190, rotate: -10, z: 12, delay: 80 },
            { id: 'eric-cake-3', asset: 'cake', x: 14, y: 74, size: 182, rotate: 20, z: 16, delay: 140 },
            { id: 'eric-greenbadge', asset: 'greenbadge', x: 79, y: 29, size: 222, rotate: 16, z: 18, delay: 190 },
        ],
    },
    {
        id: 'amanda',
        label: 'Amanda',
        image: 'mockups/amandaprofile.png',
        mobileImage: 'mockups/amandaprofilemobile.png',
        stickers: [
            { id: 'amanda-pie-1', asset: 'pie', x: 17, y: 34, size: 152, rotate: -10, z: 12, delay: 0 },
            { id: 'amanda-pie-2', asset: 'pie', x: 77, y: 30, size: 182, rotate: 15, z: 12, delay: 80 },
            { id: 'amanda-pie-3', asset: 'pie', x: 21, y: 78, size: 202, rotate: -4, z: 16, delay: 140 },
            { id: 'amanda-yellowbadge', asset: 'yellowbadge', x: 80, y: 80, size: 222, rotate: 10, z: 18, delay: 190 },
        ],
    },
]

function Profile() {
    const MOBILE_STICKER_SCALE = 0.40
  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  )
    const sectionRef = useRef(null)
    const [activeProfile, setActiveProfile] = useState(PROFILES[0])
    const [outgoingProfile, setOutgoingProfile] = useState(null)
    const [hasEnteredSection, setHasEnteredSection] = useState(false)
    const transitionTimeoutRef = useRef(null)

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)

        return () => {
            window.removeEventListener('resize', checkMobile)
        }
    }, [])

    const transitionToProfile = (nextProfile) => {
        if (!nextProfile || nextProfile.id === activeProfile.id) {
            return
        }

        if (transitionTimeoutRef.current) {
            clearTimeout(transitionTimeoutRef.current)
        }

        setOutgoingProfile(activeProfile)
        setActiveProfile(nextProfile)

        transitionTimeoutRef.current = setTimeout(() => {
            setOutgoingProfile(null)
        }, 800)
    }

    useEffect(() => {
        if (!sectionRef.current) {
            return
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasEnteredSection(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.5,
                rootMargin: '0px 0px -8% 0px',
            }
        )

        observer.observe(sectionRef.current)

        return () => {
            observer.disconnect()
        }
    }, [])

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) {
                clearTimeout(transitionTimeoutRef.current)
            }
        }
    }, [])

    useEffect(() => {
        if (!hasEnteredSection) {
            return
        }

        const autoAdvanceTimeout = setTimeout(() => {
            const activeIndex = PROFILES.findIndex((profile) => profile.id === activeProfile.id)
            const nextIndex = (activeIndex + 1) % PROFILES.length
            transitionToProfile(PROFILES[nextIndex])
        }, 6000)

        return () => {
            clearTimeout(autoAdvanceTimeout)
        }
    }, [hasEnteredSection, activeProfile.id])

    const handleProfileSelect = (profile) => {
        transitionToProfile(profile)
    }

    const getStickerStyle = (sticker) => ({
        '--sticker-size-mobile': `${sticker.mobileSize ?? Math.round(sticker.size * MOBILE_STICKER_SCALE)}px`,
        '--sticker-x': `${sticker.x}%`,
        '--sticker-y': `${sticker.y}%`,
        '--sticker-size': `${sticker.size}px`,
        '--sticker-rotate': `${sticker.rotate ?? 0}deg`,
        '--sticker-z': sticker.z ?? 12,
        '--sticker-delay': `${sticker.delay ?? 0}ms`,
    })

    const resolveStickerSrc = (sticker) => {
        if (sticker.image) {
            return sticker.image
        }

        return STICKER_ASSETS[sticker.asset]
    }

    const resolveProfileSrc = (profile) => {
        if (isMobile && profile.mobileImage) {
            return profile.mobileImage
        }

        return profile.image
    }

    return (
        <div className="profile-section" ref={sectionRef}>
            <div className="profile-pill">
                <span className="profile-pill-text">YOUR PERSONAL APP</span>
            </div>
            <h2 className="profile-title">A profile as <DrawUnderline>unique</DrawUnderline> as your recipes.</h2>
            {/* <p className="profile-subtitle">Share your culinary creations, follow friends, and discover new favorites.</p> */}
            <div className="profile-mockup-shell">
                <div className="profile-selector-pill" style={{ '--active-index': PROFILES.findIndex((profile) => profile.id === activeProfile.id) }}>
                    <div className="profile-selector-highlight" aria-hidden="true" />
                    {PROFILES.map((profile) => (
                        <button
                            key={profile.id}
                            type="button"
                            className={`profile-selector-option ${activeProfile.id === profile.id ? 'is-active' : ''}`}
                            onClick={() => handleProfileSelect(profile)}
                            aria-pressed={activeProfile.id === profile.id}
                        >
                            {profile.label}
                        </button>
                    ))}
                </div>

                <div className="profile-sticker-layer" aria-hidden="true">
                    {outgoingProfile?.stickers?.map((sticker) => (
                        <img
                            key={`out-${outgoingProfile.id}-${sticker.id}`}
                            src={resolveStickerSrc(sticker)}
                            alt=""
                            className="profile-sticker profile-sticker--out"
                            style={getStickerStyle(sticker)}
                        />
                    ))}

                    {activeProfile.stickers?.map((sticker) => (
                        <img
                            key={`in-${activeProfile.id}-${sticker.id}`}
                            src={resolveStickerSrc(sticker)}
                            alt=""
                            className={`profile-sticker ${hasEnteredSection ? 'profile-sticker--in' : ''}`}
                            style={getStickerStyle(sticker)}
                        />
                    ))}
                </div>

                <div className="profile-mockup-stage">
                    {outgoingProfile && (
                        <img
                            key={`out-${outgoingProfile.id}`}
                            src={resolveProfileSrc(outgoingProfile)}
                            alt={`${outgoingProfile.label} profile mockup`}
                            className="profile-mockup profile-mockup--exit"
                        />
                    )}

                    <img
                        key={`in-${activeProfile.id}`}
                        src={resolveProfileSrc(activeProfile)}
                        alt={`${activeProfile.label} profile mockup`}
                        className={`profile-mockup ${outgoingProfile ? 'profile-mockup--enter' : ''}`}
                    />
                </div>
            </div>

            <div className="profile-info-grid">
                <article className="profile-info-card">
                    <div className="profile-info-content">
                        <h3 className="profile-info-title">Badges</h3>
                        <p className="profile-info-description">Gain achievements and collect badges to personalize your profile.</p>
                    </div>
                    <div className="profile-info-media">
                        <div className="profile-info-images profile-info-images-badges" aria-hidden="true">
                            <img src="images/yellowbadge.svg" alt="" className="profile-info-image" />
                            <img src="images/greenbadge.svg" alt="" className="profile-info-image" />
                            <img src="images/bluebadge.svg" alt="" className="profile-info-image" />
                        </div>
                    </div>
                </article>

                <article className="profile-info-card">
                    <div className="profile-info-content">
                        <h3 className="profile-info-title">Stickers</h3>
                        <p className="profile-info-description">Express your personality with unique and customizable stickers.</p>
                    </div>
                    <div className="profile-info-media">
                        <div className="profile-info-images profile-info-images-stickers" aria-hidden="true">
                            <img src="foodicons/sushi.png" alt="" className="profile-info-image" />
                            <img src="foodicons/salad.png" alt="" className="profile-info-image" />
                            <img src="foodicons/pie.png" alt="" className="profile-info-image" />
                        </div>
                    </div>
                </article>

                <article className="profile-info-card">
                    <div className="profile-info-content">
                        <h3 className="profile-info-title">Verified</h3>
                        <p className="profile-info-description">Become a verfied creator and receive exclusive benefits.</p>
                    </div>
                    <div className="profile-info-media">
                        <div className="profile-info-images profile-info-images-verified" aria-hidden="true">
                            <img src="images/verifiedbadge.svg" alt="" className="profile-info-image" />
                        </div>
                    </div>
                </article>
            </div>
        </div>
    )
}

export default Profile