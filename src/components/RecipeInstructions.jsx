import { useState, useEffect } from 'react'
import './RecipeInstructions.css'
import DrawUnderline from '@/components/ui/DrawUnderline'

function RecipeInstructions() {
    const [isMobile, setIsMobile] = useState(false)
  
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth <= 768)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [])

  return (
    <div className="recipe-instructions-section">
      <div className="recipe-pill">
        <span className="recipe-pill-text">RECIPES</span>
      </div>
      <h2 className="recipe-instructions-title"><DrawUnderline>Gliiiide</DrawUnderline> through your cooking</h2>
      <p className="instructions-subtitle">Cook with total confidence. You'll never feel lost again.</p>

      <div className="recipe-instructions-content">
        <img
          src={isMobile ? "mockups/recipeinstructionsmockupmobile.png" : "mockups/recipeinstructionsmockup.png"}
          alt="Recipe instructions mockup"
          className="recipe-instructions-mockup"
        />

        {isMobile ? (
          <svg
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
          {/* Line 1: from "with" down and curving right to image left edge */}
          <path d="M 150 160 L 170 160" />

          {/* Line 2: from image right edge at same y, goes right, curves down, curves left back onto image */}
          <path d="M 830 160 L 930 160 Q 970 160 970 200 L 970 290 Q 970 330 930 330 L 830 330" />

          {/* Line 3: from left of "step", goes left past image left edge, curves down, ends */}
          <path d="M 170 330 L 120 330 Q 80 330 80 370 L 80 420" />

          {/* Line 4: from bottom of "by", goes down, curves right to image left edge */}
          <path d="M 80 460 L 80 500 Q 80 540 120 540 L 170 540" />

          {/* Line 5: from image right edge at same y, goes right, curves down, ends */}
          <path d="M 830 540 L 880 540 Q 920 540 920 580 L 920 640" />

          {/* Line 6: from below "step", goes down, curves left past right edge to halfway across image */}
          <path d="M 920 740 L 920 790 Q 920 830 880 830 L 350 830" />

          {/* All rects and texts above */}
          {/* "with" - top left of image */}
          <rect x="-32" y="110" width="180" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="117" y="180" textAnchor="end">with</text>

          {/* "step" - to the left of line 2 end */}
          <rect x="860" y="278" width="180" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="1010" y="343" textAnchor="end">step</text>

          {/* "by" - below line 3 end */}
          <rect x="15" y="390" width="120" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="80" y="455" textAnchor="middle">by</text>

          {/* "step" - below line 5 end */}
          <rect x="840" y="640" width="180" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="935" y="705" textAnchor="middle">step</text>

          {/* "instructions" - to the left of line 6 end */}
          <rect x="-10" y="780" width="360" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="325" y="848" textAnchor="end">instructions</text>
        </svg>
        ) : (
          <svg
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
          {/* Line 1: from "with" down and curving right to image left edge */}
          <path d="M 150 160 L 230 160" />

          {/* Line 2: from image right edge at same y, goes right, curves down, curves left back onto image */}
          <path d="M 770 160 L 930 160 Q 970 160 970 200 L 970 290 Q 970 330 930 330 L 770 330" />

          {/* Line 3: from left of "step", goes left past image left edge, curves down, ends */}
          <path d="M 225 330 L 120 330 Q 80 330 80 370 L 80 420" />

          {/* Line 4: from bottom of "by", goes down, curves right to image left edge */}
          <path d="M 80 460 L 80 500 Q 80 540 120 540 L 225 540" />

          {/* Line 5: from image right edge at same y, goes right, curves down, ends */}
          <path d="M 770 540 L 880 540 Q 920 540 920 580 L 920 640" />

          {/* Line 6: from below "step", goes down, curves left past right edge to halfway across image */}
          <path d="M 920 700 L 920 750 Q 920 790 880 790 L 350 790" />

          {/* All rects and texts above */}
          {/* "with" - top left of image */}
          <rect x="-52" y="110" width="200" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="115" y="180" textAnchor="end">with</text>

          {/* "step" - to the left of line 2 end */}
          <rect x="865" y="278" width="200" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="1030" y="343" textAnchor="end">step</text>

          {/* "by" - below line 3 end */}
          <rect x="8" y="390" width="140" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="80" y="455" textAnchor="middle">by</text>

          {/* "step" - below line 5 end */}
          <rect x="820" y="620" width="200" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="920" y="685" textAnchor="middle">step</text>

          {/* "instructions" - to the left of line 6 end */}
          <rect x="-10" y="740" width="400" height="95" rx="28" ry="28" fill="white" filter="url(#textShadow)" />
          <text x="360" y="808" textAnchor="end">instructions</text>
        </svg>
        )}
      </div>
    </div>
  )
}

export default RecipeInstructions
