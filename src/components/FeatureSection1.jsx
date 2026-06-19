import { useEffect, useState } from 'react'
import './FeatureSection1.css'

const defaultImages = [
	{
		id: 'post-1',
		src: '/carouselimages/carousel1.png',
		alt: 'A polished recipe post card',
		rotation: -8,
	},
	{
		id: 'post-2',
		src: '/carouselimages/carousel2.png',
		alt: 'A vibrant plated meal',
		rotation: 6,
	},
	{
		id: 'post-3',
		src: '/carouselimages/carousel3.png',
		alt: 'A social cooking preview',
		rotation: -4,
	},
	{
		id: 'post-4',
		src: '/carouselimages/carousel4.png',
		alt: 'A recipe discovery layout',
		rotation: 9,
	},
	{
		id: 'post-5',
		src: '/carouselimages/carousel5.png',
		alt: 'A shared food moment',
		rotation: -10,
	},
	{
		id: 'post-6',
		src: '/carouselimages/carousel6.png',
		alt: 'A mobile cooking feed',
		rotation: 5,
	},
]

function FeatureSection1({
	images = defaultImages,
}) {
	const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 })
	const [isHovering, setIsHovering] = useState(false)
	const [rotatingCards, setRotatingCards] = useState([])

	useEffect(() => {
		setRotatingCards(images.map((_, index) => index * (360 / images.length)))
	}, [images])

	useEffect(() => {
		const interval = window.setInterval(() => {
			setRotatingCards((previous) => previous.map((angle) => (angle + 0.5) % 360))
		}, 50)

		return () => window.clearInterval(interval)
	}, [])

	const handleMouseMove = (event) => {
		const rect = event.currentTarget.getBoundingClientRect()
		setMousePosition({
			x: (event.clientX - rect.left) / rect.width,
			y: (event.clientY - rect.top) / rect.height,
		})
	}


	return (
		<section className="feature-section-1" aria-label="Feature section 1">
			<div className="feature-section-1__inner">
				<div className="feature-section-1__copy">
					<h2 className="feature-section-1__title" aria-label="A better way to find recipes">
						<span className="feature-section-1__title-line">
							<span>A</span>
							<span className="feature-section-1__title-badge">
								<img src="/badges/ambassadorbadge.png" alt="" aria-hidden="true" className="feature-section-1__title-badge-icon" />
								<span className="feature-section-1__title-badge-text">better</span>
							</span>
						</span>
						<span>way to find</span>
						<span>recipes</span>
					</h2>
					<p className="feature-section-1__subtitle">
						Discover real recipes made by real people. Munch gets you inspired to cook whether you’re a pro or you’ve just started.
					</p>
				</div>

				<div
					className="feature-section-1__carousel-shell"
					onMouseMove={handleMouseMove}
					onMouseEnter={() => setIsHovering(true)}
					onMouseLeave={() => setIsHovering(false)}
				>
					<div className="feature-section-1__carousel-perspective">
						{images.map((image, index) => {
							const angle = (rotatingCards[index] || 0) * (Math.PI / 180)
							const radius = isHovering ? 240 : 200
							const x = Math.cos(angle) * radius
							const y = Math.sin(angle) * radius
							const rotateX = (mousePosition.y - 0.5) * 18
							const rotateY = (mousePosition.x - 0.5) * 18

							return (
								<div
									key={image.id}
									className="feature-section-1__card-shell"
									style={{
										transform: `translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${image.rotation}deg)`,
									}}
								>
									<div className="feature-section-1__card">
										<img src={image.src} alt={image.alt} className="feature-section-1__image" loading={index < 2 ? 'eager' : 'lazy'} />
										<div className="feature-section-1__shine" />
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

export default FeatureSection1
