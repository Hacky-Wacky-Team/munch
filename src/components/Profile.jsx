import { useEffect, useRef, useState } from 'react'
import './Profile.css'

const STICKER_ASSETS = {
    boba: 'stickers/bobasticker.svg',
    cake: 'stickers/cakesticker.svg',
    pizza: 'stickers/pizzasticker.svg',
    sushi: 'stickers/sushisticker.svg',
    ambassador: 'badges/ambassador.svg',
    celebrity: 'badges/celebrity.svg',
    engagedchef: 'badges/engagedchef.svg',
    friendly: 'badges/friendly.svg',
    og: 'badges/og.svg',
    popularchef: 'badges/popularchef.svg',
    recipemaster: 'badges/recipemaster.svg',
    socialbutterfly: 'badges/socialbutterfly.svg',
    tablefor6: 'badges/tablefor6.svg',
}

const PROFILES = [
    {
        id: 'sam',
        label: 'Sam',
        image: 'mockups/samprofile.png',
        mobileImage: 'mockups/samprofile.png',
        stickers: [
            { id: 'sam-sushi-1', asset: 'sushi', x: 11, y: 37, size: 130, rotate: -7, z: 12, delay: 0 },
            { id: 'sam-recipemaster-2', asset: 'recipemaster', x: 84, y: 36, size: 120, rotate: 11, z: 12, delay: 80 },
            { id: 'sam-sushi-3', asset: 'sushi', x: 85, y: 82, size: 160, rotate: 8, z: 16, delay: 140 },
            { id: 'sam-og', asset: 'og', x: 15, y: 78, size: 120, rotate: 7, z: 18, delay: 190 },
        ],
    },
    {
        id: 'jonny',
        label: 'Jonny',
        image: 'mockups/jonnyprofile.png',
        mobileImage: 'mockups/jonnyprofile.png',
        stickers: [
            { id: 'jonny-pizza-1', asset: 'pizza', x: 14, y: 38, size: 130, rotate: 0, z: 12, delay: 0 },
            { id: 'jonny-pizza-2', asset: 'pizza', x: 85, y: 74, size: 110, rotate: 10, z: 12, delay: 80 },
            { id: 'jonny-engagedchef', asset: 'engagedchef', x: 16, y: 80, size: 150, rotate: 20, z: 16, delay: 140 },
            { id: 'jonny-celebrity', asset: 'celebrity', x: 85, y: 35, size: 132, rotate: -10, z: 18, delay: 190 },
        ],
    },
    {
        id: 'isha',
        label: 'Isha',
        image: 'mockups/ishaprofile.png',
        mobileImage: 'mockups/ishaprofile.png',
        stickers: [
            { id: 'isha-popularchef', asset: 'popularchef', x: 17, y: 34, size: 132, rotate: -10, z: 12, delay: 0 },
            { id: 'isha-boba-2', asset: 'boba', x: 85, y: 35, size: 130, rotate: 30, z: 12, delay: 80 },
            { id: 'isha-boba-3', asset: 'boba', x: 14, y: 78, size: 150, rotate: -4, z: 16, delay: 140 },
            { id: 'isha-socialbutterfly', asset: 'socialbutterfly', x: 80, y: 80, size: 150, rotate: 10, z: 18, delay: 190 },
        ],
    },
    {
        id: 'eric',
        label: 'Eric',
        image: 'mockups/ericprofile.png',
        mobileImage: 'mockups/ericprofile.png',
        stickers: [
            { id: 'eric-cake-1', asset: 'cake', x: 14, y: 38, size: 130, rotate: -12, z: 12, delay: 0 },
            { id: 'eric-cake-2', asset: 'cake', x: 80, y: 84, size: 160, rotate: 0, z: 12, delay: 80 },
            { id: 'eric-tablefor6', asset: 'tablefor6', x: 17, y: 82, size: 130, rotate: 20, z: 16, delay: 140 },
            { id: 'eric-ambassador', asset: 'ambassador', x: 85, y: 38, size: 140, rotate: 16, z: 18, delay: 190 },
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
        }, 5000)

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
        </div>
    )
}

export default Profile