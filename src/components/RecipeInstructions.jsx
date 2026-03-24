import { useState, useEffect, useRef } from 'react'
import './RecipeInstructions.css'
import DrawUnderline from '@/components/ui/DrawUnderline'

function RecipeInstructions() {
  const [isMobile, setIsMobile] = useState(
    () => (typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  )
  const sectionRef = useRef(null)
  const overlayRef = useRef(null)
  const pathDataRef = useRef([])
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !overlayRef.current) return

    const section = sectionRef.current
    const overlay = overlayRef.current
    let rafId = null

    const setupPaths = () => {
      const paths = overlay.querySelectorAll('path')
      pathDataRef.current = Array.from(paths)
        .slice(0, 6)
        .map((path) => {
          const length = path.getTotalLength()
          path.style.strokeDasharray = `${length}`
          path.style.strokeDashoffset = `${length}`
          return { path, length }
        })
    }

    const updatePaths = () => {
      rafId = null
      const rect = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight

      // Progress goes from 0 when section starts entering viewport bottom
      // to 1 when section has fully traveled through the viewport.
      const travel = viewportHeight + rect.height
      const progress = (viewportHeight - rect.top) / travel
      const clampedProgress = Math.max(0, Math.min(1, progress))

      // Shift timing window: begin later and finish earlier.
      const DRAW_START = 0.25
      const DRAW_END = 0.6
      const adjustedProgress = (clampedProgress - DRAW_START) / (DRAW_END - DRAW_START)
      const clampedAdjustedProgress = Math.max(0, Math.min(1, adjustedProgress))

      const lineCount = pathDataRef.current.length || 6
      pathDataRef.current.forEach(({ path, length }, index) => {
        if (!length) return

        const lineStart = index / lineCount
        const lineEnd = (index + 1) / lineCount
        const localProgress = (clampedAdjustedProgress - lineStart) / (lineEnd - lineStart)
        const clampedLocal = Math.max(0, Math.min(1, localProgress))

        path.style.strokeDashoffset = `${length * (1 - clampedLocal)}`
      })
    }

    const onScrollOrResize = () => {
      if (rafId !== null) return
      rafId = requestAnimationFrame(updatePaths)
    }

    setupPaths()
    updatePaths()

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
    <div className="recipe-instructions-section" ref={sectionRef}>
      <div className="recipe-pill">
        <span className="recipe-pill-text">YOUR RECIPE APP</span>
      </div>
      <h2 className="recipe-instructions-title" style={{lineHeight: isMobile ? '1' : '1.1' }}><DrawUnderline>Glide</DrawUnderline> through your cooking</h2>
      <h2 className="recipe-instructions-title" style={{ color: '#b0c6b0', marginBottom: '2rem', marginTop: isMobile ? '0rem' : '-0.5rem' }}>with total confidence</h2>

      <div className="recipe-instructions-content">
        <img
          src={isMobile ? "mockups/recipeinstructionsmockupmobile.png" : "mockups/recipeinstructionsmockup.png"}
          alt="Recipe instructions mockup"
          className="recipe-instructions-mockup"
        />

        {isMobile ? (
          <svg
            ref={overlayRef}
            className="recipe-instructions-overlay"
            viewBox="0 0 1000 900"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
            <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>

{/* All paths first */}

          {/* Line 1: from image right edge at same y, goes right, curves down, curves left back onto image */}
          <path d="M 980 50 L 910 50" />

          {/* Line 2: from left of "step", goes left past image left edge, curves down, ends */}
          <path d="M 90 50 L 15 50 Q -25 50 -25 90 L -25 180" />

          {/* Line 3: from bottom of "by", goes down, curves right to image left edge */}
          <path d="M -25 280 L -25 360 Q -25 400 15 400 L 90 400" />

          {/* Line 4: from image right edge at same y, goes right, curves down, ends */}
          <path d="M 910 400 L 940 400 Q 980 400 980 440 L 980 520" />

          {/* Line 5: from below "step", goes down, curves left past right edge to halfway across image */}
          <path d="M 980 610 L 980 680 Q 980 720 940 720 L 440 720" />

          {/* Line 6: from below "instructions", goes down, curves left past right edge to halfway across image */}
          <path d="M 200 720 L 40 720 Q 0 720 0 760 L 0 760 L 0 880 Q 0 920 40 920 L 460 920 Q 500 920 500 960 L 500 1250" />

          {/* All rects and texts above */}

          {/* "step" - to the left of line 2 end */}
          <rect x="925" y="0" width="165" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="1065" y="65" textAnchor="end">step</text>

          {/* "by" - below line 3 end */}
          <rect x="-80" y="180" width="120" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="-18" y="245" textAnchor="middle">by</text>

          {/* "step" - below line 5 end */}
          <rect x="890" y="520" width="165" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="970" y="585" textAnchor="middle">step</text>

          {/* "instructions" - to the left of line 6 end */}
          <rect x="100" y="670" width="350" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="430" y="735" textAnchor="end">instructions</text>

          <rect x="450" y="1160" width="100" height="100" rx="50" ry="50" fill="white" filter="url(#textShadow)" />
          <text x="518" y="1215" textAnchor="end">⌄</text>
        </svg>
        ) : (
          <svg
            ref={overlayRef}
            className="recipe-instructions-overlay"
            viewBox="0 0 1000 900"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
            <filter id="textShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* All paths first */}
          {/* Line 1: from image right edge at same y, goes right, curves down, curves left back onto image */}
          <path d="M 930 160 L 740 160" />

          {/* Line 2: from left of "step", goes left past image left edge, curves down, ends */}
          <path d="M 260 160 L 120 160 Q 80 160 80 200 L 80 260" />

          {/* Line 3: from bottom of "by", goes down, curves right to image left edge */}
          <path d="M 80 280 L 80 320 Q 80 360 120 360 L 257 360" />

          {/* Line 4: from image right edge at same y, goes right, curves down, ends */}
          <path d="M 740 360 L 880 360 Q 920 360 920 400 L 920 460" />

          {/* Line 5: from below "step", goes down, curves left past right edge to halfway across image */}
          <path d="M 920 530 L 920 580 Q 920 620 880 620 L 350 620" />

          {/* Line 6: from below "instructions", goes down, curves left past right edge to halfway across image */}
          <path d="M 200 620 L 40 620 Q 0 620 0 660 L 0 660 L 0 780 Q 0 820 40 820 L 460 820 Q 500 820 500 860 L 500 1000" />

          {/* All rects and texts above */}

          {/* "step" - to the left of line 2 end */}
          <rect x="865" y="110" width="180" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="1015" y="175" textAnchor="end">step</text>

          {/* "by" - below line 3 end */}
          <rect x="13" y="220" width="130" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="80" y="285" textAnchor="middle">by</text>

          {/* "step" - below line 5 end */}
          <rect x="825" y="440" width="180" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="917" y="505" textAnchor="middle">step</text>

          {/* "instructions" - to the left of line 6 end */}
          <rect x="90" y="570" width="370" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="430" y="638" textAnchor="end">instructions</text>

          <rect x="460" y="960" width="80" height="80" rx="40" ry="40" fill="white" filter="url(#textShadow)" />
          <text x="520" y="1008" textAnchor="end">⌄</text>
        </svg>
        )}
      </div>
    </div>
  )
}

export default RecipeInstructions
