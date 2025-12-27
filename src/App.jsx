import { useState, useEffect, useRef } from 'react'
import './App.css'
import { db } from './firebase'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'
import { FiClock, FiSearch } from 'react-icons/fi'
import { FaApple, FaStar } from 'react-icons/fa'
import { FaEarthAmericas } from 'react-icons/fa6'
import { HiSparkles } from 'react-icons/hi'
import { IoLeaf } from 'react-icons/io5'
import { GiChefToque } from 'react-icons/gi'
import { LuChefHat } from "react-icons/lu"
import { PiPaperPlaneTiltFill } from 'react-icons/pi'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isDarkSection, setIsDarkSection] = useState(false)
  const featuresTrackRef = useRef(null)

  // Toast auto-dismiss after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showToast])

  // Detect when user is in dark section for navbar color change
  useEffect(() => {
    const handleScroll = () => {
      const darkSection = document.querySelector('.dark-background-section')
      if (darkSection) {
        const rect = darkSection.getBoundingClientRect()
        const isInDarkSection = rect.top <= 100 && rect.bottom >= 100
        setIsDarkSection(isInDarkSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleJoinWaitlist = async (e) => {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setMessage('Please fill in all fields')
      setShowToast(true)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setMessage('Please enter a valid email address')
      setShowToast(true)
      return
    }

    setIsSubmitting(true)
    setMessage('')
    setShowToast(false)

    try {
      // Check if email already exists
      const q = query(collection(db, 'users'), where('email', '==', email.trim()))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        setMessage('This email is already on the waitlist!')
        setShowToast(true)
        setIsSubmitting(false)
        return
      }

      // Add document to Firestore
      await addDoc(collection(db, 'users'), {
        name: name.trim(),
        email: email.trim(),
        timestamp: new Date()
      })

      setMessage('Successfully joined the waitlist!')
      setShowToast(true)
      setName('')
      setEmail('')
    } catch (error) {
      console.error('Error adding document: ', error)
      setMessage('Something went wrong. Please try again.')
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Carousel functionality
  useEffect(() => {
    const handleScroll = () => {
      const track = featuresTrackRef.current
      if (!track) return

      const scrollLeft = track.scrollLeft
      const scrollWidth = track.scrollWidth
      const clientWidth = track.clientWidth
      const features = track.children
      
      // Check if at the very start (first feature)
      if (scrollLeft <= 10) {
        setActiveFeature(0)
        return
      }
      
      // Check if at the very end (last feature)
      if (scrollLeft >= scrollWidth - clientWidth - 10) {
        setActiveFeature(features.length - 1)
        return
      }

      // For middle positions, use center-based detection
      const trackRect = track.getBoundingClientRect()
      const trackCenter = trackRect.left + trackRect.width / 2
      
      let closestFeature = 0
      let minDistance = Infinity

      for (let i = 0; i < features.length; i++) {
        const feature = features[i]
        const featureRect = feature.getBoundingClientRect()
        const featureCenter = featureRect.left + featureRect.width / 2
        const distance = Math.abs(featureCenter - trackCenter)
        
        if (distance < minDistance) {
          minDistance = distance
          closestFeature = i
        }
      }

      setActiveFeature(closestFeature)
    }

    const track = featuresTrackRef.current
    if (track) {
      track.addEventListener('scroll', handleScroll)
      handleScroll() // Initial call
    }

    return () => {
      if (track) {
        track.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const scrollToFeature = (index) => {
    const track = featuresTrackRef.current
    if (!track) return

    const feature = track.children[index]
    if (feature) {
      const trackRect = track.getBoundingClientRect()
      const featureRect = feature.getBoundingClientRect()
      const scrollLeft = track.scrollLeft + featureRect.left - trackRect.left - (trackRect.width - featureRect.width) / 2
      
      track.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <nav className={`navbar ${isDarkSection ? 'navbar-dark' : ''}`}>
        <div className="nav-left">
          <a href="/" className="nav-logo-link">
            <div className="nav-logo-container">
              <img src="images/munchicon.png" alt="Munch" className="nav-icon" />
              <span className="nav-logo">MUNCH</span>
            </div>
          </a>
        </div>
        <div className="nav-right">
          <a href="https://instagram.com/jointhemunch" target="_blank" rel="noopener noreferrer">
            <button className="nav-button">
              <PiPaperPlaneTiltFill className="button-icon" />
              Instagram
            </button>
          </a>
          <a href="#waitlist">
            <button className="nav-button">
              <FiClock className="button-icon" />
              Join the Waitlist
            </button>
          </a>
        </div>
      </nav>
      <div className="main-content">
        <div id="waitlist" className="waitlist-container">
            <div className="titletext">
              <h1 className="title1">JOIN THE</h1>
              <h1 className="title2"><span className="munch-highlight">MUNCH</span> MENT</h1>
              <div className="title-buttons">
                <button className="title-button">
                  <FaApple className="title-button-icon" />
                  iOS App
                </button>
                <button className="title-button">
                  Coming Soon
                </button>
              </div>
            </div>
            <div className="waitlist-box">
              <div className="waitlist-left-panel">
                <h2 className="waitlist-header">Be the <span className="first-highlight">first</span> to know when we launch<PiPaperPlaneTiltFill className="waitlist-header-icon" /></h2>
                <form onSubmit={handleJoinWaitlist} noValidate>  
                  <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
              </div>
              <div className="waitlist-right-panel">
                <img src="images/waitlistfoodimage.png" alt="Food" className="waitlist-food-image" />
              </div>
            </div>
        </div>
        
        <div className="endorsement-section">
          <div className="university-logos-container">
            <h2 className="endorsement-header">Loved by students at top schools</h2>
            <div className="university-logos-row">
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
              {/* Duplicate set for seamless loop */}
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
              {/* Third set to ensure no gaps */}
              <img src="logos/carletonlogo.webp" alt="Carleton University" className="university-logo" />
              <img src="logos/uoftlogo.webp" alt="University of Toronto" className="university-logo" />
              <img src="logos/waterloologo.webp" alt="University of Waterloo" className="university-logo" />
              <img src="logos/westernlogo.webp" alt="Western University" className="university-logo" />
              <img src="logos/mcmasterlogo.webp" alt="McMaster University" className="university-logo" />
              <img src="logos/queenslogo.webp" alt="Queen's University" className="university-logo" />
            </div>
          </div>
        </div>
        
        <div className="scrolling-section">
          <div className="scrolling-text">
            <h2 className="scrolling-title">Join a <span className="community-highlight">Community</span> of Foodies</h2>
            <p className="scrolling-description">Connect, share, and discover recipes with fellow food enthusiasts. Munch brings food lovers together in one deliciously vibrant community.
            </p>
          </div>
          <div className="scrolling-rows">
            <div className="scroll-row scroll-row-1">
            {/* First set of boxes */}
            <div className="scroll-box1"></div>
            <div className="scroll-box2"></div>
            <div className="scroll-box3"></div>
            <div className="scroll-box4"></div>
            <div className="scroll-box5"></div>
            <div className="scroll-box6"></div>
            {/* Second set - exact duplicate for seamless loop */}
            <div className="scroll-box box-color-1"></div>
            <div className="scroll-box box-color-2"></div>
            <div className="scroll-box box-color-3"></div>
            <div className="scroll-box box-color-4"></div>
            <div className="scroll-box box-color-5"></div>
            <div className="scroll-box box-color-6"></div>
          </div>
        </div>
        </div>
      </div>
      
      <div className="gradient-transition-to-dark"></div>
      <div className="dark-background-section">
      <div className="section-header">
        <HiSparkles className="section-sparkle-icon" />
        <h1 className="section-title">Just a snap away from delicious recipes</h1>
      </div>
      <svg className="wave-decoration" width="100%" height="100%" viewBox="0 0 1440 390" xmlns="http://www.w3.org/2000/svg">
          <path d="M 0,400 L 0,400 C 18.463793598560997,253.0091730378007 36.927587197121994,106.01834607560141 63,51 C 89.072412802878,-4.018346075601419 122.75344481007303,32.935788735395036 148,45 C 173.24655518992697,57.064211264604964 190.05863356258584,44.23849898281844 214,43 C 237.94136643741416,41.76150101718156 269.01202093958364,52.110215333331205 296,54 C 322.98797906041636,55.889784666668795 345.8932826790797,49.320639683856754 367,56 C 388.1067173209203,62.679360316143246 407.4148483440976,82.60722593124176 433,86 C 458.5851516559024,89.39277406875824 490.44732394453,76.25045659117619 514,78 C 537.55267605547,79.74954340882381 552.7958558777825,96.39094770405347 573,89 C 593.2041441222175,81.60905229594653 618.36925254434,50.18575259260992 645,49 C 671.63074745566,47.81424740739008 699.7271339448572,76.86604192550688 726,78 C 752.2728660551428,79.13395807449312 776.7222116762315,52.35007970536254 796,43 C 815.2777883237685,33.64992029463746 829.3840193502172,41.73363925304294 853,54 C 876.6159806497828,66.26636074695706 909.7417109228998,82.71536328246573 934,75 C 958.2582890771002,67.28463671753427 973.6491369581837,35.40490761709417 996,31 C 1018.3508630418163,26.595092382905836 1047.661741244365,49.665006249157614 1076,60 C 1104.338258755635,70.33499375084239 1131.7038980643551,67.93506738627545 1156,69 C 1180.2961019356449,70.06493261372455 1201.5226664982142,74.59472420574059 1221,69 C 1240.4773335017858,63.4052757942594 1258.2054359427887,47.68603579076215 1284,34 C 1309.7945640572113,20.313964209237856 1343.6555897306318,8.661132631210819 1371,70 C 1398.3444102693682,131.33886736878918 1419.1722051346842,265.66943368439456 1440,400 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#00d084" fillOpacity="0.265" className="transition-all duration-300 ease-in-out delay-150 path-0"></path>
          <path d="M 0,400 L 0,400 C 22.170799786982634,289.1886992235848 44.34159957396527,178.37739844716958 68,134 C 91.65840042603473,89.6226015528304 116.80440149112158,111.67910543490643 139,128 C 161.19559850887842,144.32089456509357 180.4407944615484,154.9061798132047 207,164 C 233.5592055384516,173.0938201867953 267.4324206626849,180.69617531227482 295,169 C 322.5675793373151,157.30382468772518 343.829522887712,126.30911893769597 363,123 C 382.170477112288,119.69088106230403 399.2494877864671,144.06734893694127 425,149 C 450.7505122135329,153.93265106305873 485.17252596641936,139.4214853145389 512,137 C 538.8274740335806,134.5785146854611 558.0604083478553,144.24670980490316 582,138 C 605.9395916521447,131.75329019509684 634.5858406421594,109.59167546584843 654,113 C 673.4141593578406,116.40832453415157 683.5962290835074,145.38658833170317 708,154 C 732.4037709164926,162.61341166829683 771.0292430238112,150.86197120733885 797,141 C 822.9707569761888,131.13802879266115 836.2867988212478,123.16552683894147 861,122 C 885.7132011787522,120.83447316105853 921.8235616911979,126.47592143689522 945,137 C 968.1764383088021,147.52407856310478 978.4189544139608,162.93078741347767 1003,167 C 1027.5810455860392,171.06921258652233 1066.5006206529579,163.800928909194 1093,156 C 1119.4993793470421,148.199071090806 1133.5785629742074,139.86549694974633 1152,141 C 1170.4214370257926,142.13450305025367 1193.1851274502123,152.73708329182054 1217,154 C 1240.8148725497877,155.26291670817946 1265.680927224943,147.1861698829714 1292,127 C 1318.319072775057,106.81383011702862 1346.0911636500164,74.5182371762939 1371,118 C 1395.9088363499836,161.4817628237061 1417.9544181749918,280.740881411853 1440,400 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#00d084" fillOpacity="0.4" className="transition-all duration-300 ease-in-out delay-150 path-1"></path>
          <path d="M 0,400 L 0,400 C 29.665605275156445,330.1310251798286 59.33121055031289,260.2620503596572 81,226 C 102.66878944968711,191.73794964034275 116.34076307390487,193.08282374119963 138,209 C 159.65923692609513,224.91717625880037 189.3057371540676,255.40665467554422 215,249 C 240.6942628459324,242.59334532445578 262.4362883098248,199.29055755662358 284,197 C 305.5637116901752,194.70944244337642 326.9491096066332,233.43111509796148 349,234 C 371.0508903933668,234.56888490203852 393.76727326364227,196.98498205153058 418,190 C 442.23272673635773,183.01501794846942 467.9817973387977,206.6289566959163 498,209 C 528.0182026612023,211.3710433040837 562.305537381167,192.4991911648043 588,199 C 613.694462618833,205.5008088351957 630.7960531365344,237.3742786448665 650,241 C 669.2039468634656,244.6257213551335 690.5102500726954,220.0036942557297 716,221 C 741.4897499273046,221.9963057442703 771.1629465726835,248.61094433221464 792,246 C 812.8370534273165,243.38905566778536 824.8379636365707,211.5525284154119 852,208 C 879.1620363634293,204.4474715845881 921.4851988810339,229.17894200613773 947,241 C 972.5148011189661,252.82105799386227 981.2212408392945,251.73170356003726 999,243 C 1016.7787591607055,234.26829643996274 1043.6298377617877,217.89424375371317 1073,219 C 1102.3701622382123,220.10575624628683 1134.2594081135542,238.69132142510998 1158,237 C 1181.7405918864458,235.30867857489002 1197.3325297839958,213.34047054584684 1223,216 C 1248.6674702160042,218.65952945415316 1284.4104727504628,245.94679639150277 1309,247 C 1333.5895272495372,248.05320360849723 1347.0255792141534,222.87234388814204 1367,244 C 1386.9744207858466,265.12765611185796 1413.4872103929233,332.563828055929 1440,400 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#00d084" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-2"></path>
          <path d="M 0,400 L 0,400 C 25.269888349672257,368.05887768716656 50.539776699344515,336.1177553743331 72,323 C 93.46022330065549,309.8822446256669 111.11078155229421,315.5878561898342 134,311 C 156.8892184477058,306.4121438101658 185.01709709147863,291.5308198663299 211,292 C 236.98290290852137,292.4691801336701 260.8208300817912,308.28886434484616 286,316 C 311.1791699182088,323.71113565515384 337.69958258135654,323.3137227542854 360,324 C 382.30041741864346,324.6862772457146 400.38083959278254,326.45624463801227 422,316 C 443.61916040721746,305.54375536198773 468.7770590475135,282.8612986936654 494,283 C 519.2229409524865,283.1387013063346 544.5109242171638,306.098560587326 571,305 C 597.4890757828362,303.901439412674 625.1792440838307,278.74445895703064 651,276 C 676.8207559161693,273.25554104296936 700.7720994475137,292.92360358455153 721,292 C 741.2279005524863,291.07639641544847 757.7323581261143,269.56112670476324 781,275 C 804.2676418738857,280.43887329523676 834.2984680480293,312.8318895963955 862,324 C 889.7015319519707,335.1681104036045 915.0737696817686,325.11131490965477 941,312 C 966.9262303182314,298.88868509034523 993.406453224897,282.7228507649854 1015,277 C 1036.593546775103,271.2771492350146 1053.3004174186435,275.9972820304036 1078,289 C 1102.6995825813565,302.0027179695964 1135.3918771005292,323.28802111340013 1161,318 C 1186.6081228994708,312.71197888659987 1205.1320741792395,280.8506335159958 1226,277 C 1246.8679258207605,273.1493664840042 1270.0798261825125,297.3094448226165 1291,295 C 1311.9201738174875,292.6905551773835 1330.5486210907106,263.91158719353814 1355,277 C 1379.4513789092894,290.08841280646186 1409.7256894546447,345.04420640323093 1440,400 L 1440,400 L 0,400 Z" stroke="none" strokeWidth="0" fill="#00d084" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-3"></path>
        </svg>
      <div className='big-feature-camera'>
        <div className='big-feature-content-camera'>
          <h2 className="big-feature-camera-upper-h2">CAPTURE</h2>
          <h2><span className="ai-highlight">AI-Powered</span> Camera</h2>
          <p>Take a photo of your ingredients and let Munch do the rest. Discover recipes tailored to what you have on hand, making meal prep effortless and fun.</p>
          <div className="big-feature-badges">
            <div className="big-feature-badges-row">
              <div className="big-feature-badge">
                <HiSparkles className="badge-icon" />
                <span className="badge-text">AI-Powered<br/>&nbsp;</span>
              </div>
              <div className="big-feature-badge">
                <FiSearch className="badge-icon" />
                <span className="badge-text">Ingredient Recognition</span>
              </div>
            </div>
            <div className="big-feature-badges-row">
              <div className="big-feature-badge">
                <IoLeaf className="badge-icon" />
                <span className="badge-text">Zero-Waste Cooking</span>
              </div>
              <div className="big-feature-badge">
                <GiChefToque className="badge-icon" />
                <span className="badge-text">Personalized Recipes</span>
              </div>
            </div>
          </div>
          <img src="mockups/cameramockup2.png" alt="Camera Mockup" className="big-feature-mockup" />
        </div>
      </div>
      <div className="section-header">
        <LuChefHat className="section-chef-icon" />
        <h1 className="section-title">Always one scroll away from your next meal</h1>
      </div>
      <div className='big-feature-feed'>
        <div className='big-feature-content-feed'>
          <h2 className="big-feature-camera-upper-h2">DISCOVER</h2>
          <h2><span className="ai-highlight">Personalized</span> Feed</h2>
          <p>View what your friends are cooking and get real time inspiration! Share your food pics and discover new recipes together.</p>
          <div className="big-feature-badges">
            <div className="big-feature-badges-row">
              <div className="big-feature-badge">
                <FaStar className="badge-icon" />
                <span className="badge-text">Cook up Inspiration</span>
              </div>
              <div className="big-feature-badge">
                <FiSearch className="badge-icon" />
                <span className="badge-text">Find your Recipes</span>
              </div>
            </div>
            <div className="big-feature-badges-row">
              <div className="big-feature-badge">
                <FaEarthAmericas className="badge-icon" />
                <span className="badge-text">Meet your Community</span>
              </div>
              <div className="big-feature-badge">
                <PiPaperPlaneTiltFill className="badge-icon" />
                <span className="badge-text">Share your Recipes</span>
              </div>
            </div>
          </div>
          <img src="mockups/homemockup2.png" alt="Camera Mockup" className="big-feature-mockup" />
        </div>
      </div>
      </div>
      <div className="gradient-transition-to-light"></div>

      <div id="features" className="features-carousel">
        <h3 className="features-subtitle">More Features</h3>
        <h1 className='feature-title'>Designed just for You</h1>
        <div className="features-track" ref={featuresTrackRef}>
          <div className="feature1">
            <div className="showcase-container">
              <img src="mockups/profile.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Connect with Foodies</h2>
              </div>
            </div>
          </div>

          <div className="feature2">
            <div className="showcase-container">
              <img src="mockups/home.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Scroll through your Feed</h2>
              </div>
            </div>
          </div>

          <div className="feature3">
            <div className="showcase-container">
              <div className="showcase-content">
                <h2>Share your Recipes</h2>
              </div>
              <img src="mockups/post.png" alt="App mockup" className="mockup-image" />
            </div>
          </div>
          <div className="feature4">
            <div className="showcase-container">
              <img src="mockups/recipe.png" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Recipes Based off your Pantry</h2>
              </div>
            </div>
          </div>

          <div className="feature5">
            <div className="showcase-container">
              <img src="mockups/saved.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Save your Recipes</h2>
              </div>
            </div>
          </div>

          <div className="feature6">
            <div className="showcase-container">
              <img src="mockups/mealprep.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Meal Prep</h2>
              </div>
            </div>
          </div>

          <div className="feature7">
            <div className="showcase-container">
              <img src="mockups/grocery.webp" alt="App mockup" className="mockup-image" />
              <div className="showcase-content">
                <h2>Plan your Groceries</h2>
              </div>
            </div>
          </div>

        </div>
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4, 5, 6].map((index) => (
            <span
              key={index}
              className={`carousel-dot ${activeFeature === index ? 'active' : ''}`}
              onClick={() => scrollToFeature(index)}
            />
          ))}
        </div>
      </div>


      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Munch</h3>
            <p>The ultimate food companion.</p>
          </div>
          
          <div className="footer-section">
              {/* <h4>Contact</h4>
              <ul>
                <li>hello@munch.app</li>
                <li>Follow us @munchapp</li>
              </ul> */}
          </div>


          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#waitlist">Join Waitlist</a></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>

        </div>
        <div className="footer-image">
          <img src="images/footertext2.png" alt="Footer Design" />
        </div>
      </footer>

      {/* Toast notification */}
      {showToast && (
        <div className="toast">
          {message}
        </div>
      )}
    
    </>
  )
}

export default App
