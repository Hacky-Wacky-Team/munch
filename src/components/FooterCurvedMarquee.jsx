import { useRef, useEffect, useCallback } from 'react'

const REPEAT_COUNT = 24

function FooterCurvedMarquee() {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const offsetRef = useRef(0)
  const rafRef = useRef(null)
  const lastTimeRef = useRef(null)
  const unitWidthRef = useRef(0)
  const containerWidthRef = useRef(0)

  const readConfig = useCallback(() => {
    const el = containerRef.current
    if (!el) return { curveRadius: 600, speed: 60 }

    const styles = getComputedStyle(el)
    const curveRadius = parseFloat(styles.getPropertyValue('--footer-marquee-curve-radius')) || 600
    const speed = parseFloat(styles.getPropertyValue('--footer-marquee-speed')) || 60

    return { curveRadius, speed }
  }, [])

  const getCurveY = useCallback((x, containerWidth, curveRadius) => {
    const centerX = containerWidth / 2
    const halfW = containerWidth / 2
    const xNorm = (x - centerX) / halfW
    const clampedNorm = Math.max(-1, Math.min(1, xNorm))
    const sagitta = (halfW * halfW) / (2 * curveRadius)
    return -sagitta * (1 - clampedNorm * clampedNorm)
  }, [])

  const getCurveRotation = useCallback((x, containerWidth, curveRadius) => {
    const centerX = containerWidth / 2
    const halfW = containerWidth / 2
    const xNorm = (x - centerX) / halfW
    const clampedNorm = Math.max(-1, Math.min(1, xNorm))
    const sagitta = (halfW * halfW) / (2 * curveRadius)
    const dyDx = (2 * sagitta * clampedNorm) / halfW
    return Math.atan2(dyDx, 1) * (180 / Math.PI)
  }, [])

  const measure = useCallback(() => {
    const container = containerRef.current
    const first = itemRefs.current[0]
    if (!container || !first) return

    containerWidthRef.current = container.offsetWidth

    const styles = getComputedStyle(container)
    const gap = parseFloat(styles.getPropertyValue('--footer-marquee-item-gap')) || 80
    unitWidthRef.current = first.offsetWidth + gap
  }, [])

  const updatePositions = useCallback(() => {
    const containerWidth = containerWidthRef.current
    const unitWidth = unitWidthRef.current
    if (!containerWidth || !unitWidth) return

    const { curveRadius } = readConfig()
    const loopWidth = unitWidth * REPEAT_COUNT
    const offset = offsetRef.current

    itemRefs.current.forEach((item, index) => {
      if (!item) return

      let x = index * unitWidth + (offset % loopWidth)

      if (x > containerWidth + unitWidth) {
        x -= loopWidth * Math.ceil((x - containerWidth - unitWidth) / loopWidth)
      }
      if (x < -unitWidth) {
        x += loopWidth * Math.ceil((-unitWidth - x) / loopWidth)
      }

      const itemCenterX = x + item.offsetWidth / 2
      const y = getCurveY(itemCenterX, containerWidth, curveRadius)
      const rotation = getCurveRotation(itemCenterX, containerWidth, curveRadius)

      item.style.transform = `translate3d(${x}px, calc(-50% + ${y}px), 0) rotate(${rotation}deg)`
    })
  }, [getCurveRotation, getCurveY, readConfig])

  const tick = useCallback((time) => {
    if (lastTimeRef.current == null) lastTimeRef.current = time
    const dt = (time - lastTimeRef.current) / 1000
    lastTimeRef.current = time

    const { speed } = readConfig()
    offsetRef.current += speed * dt

    updatePositions()
    rafRef.current = requestAnimationFrame(tick)
  }, [readConfig, updatePositions])

  useEffect(() => {
    measure()
    updatePositions()

    const container = containerRef.current
    const resizeObserver = new ResizeObserver(() => {
      measure()
      updatePositions()
    })

    if (container) resizeObserver.observe(container)

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      resizeObserver.disconnect()
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [measure, tick, updatePositions])

  return (
    <div className="footer-curved-marquee" ref={containerRef} aria-hidden="true">
      <div className="footer-curved-marquee-track">
        {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el }}
            className="footer-curved-marquee-item"
          >
            <img src="/images/logo.png" alt="" className="footer-curved-marquee-logo" />
            <span className="footer-curved-marquee-text">munch</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FooterCurvedMarquee
