import './Student.css'
import Endorsement from './Endorsement'

function Student() {
    return (
        <div className="student-section">
            <div className="student-dot-bg">
                <div className="student-dot-pattern" />
                <div className="title-container">
                    <div className="student-pill">
                        <span className="student-pill-text">MUNCH FOR STUDENTS
                            <img src="images/graduationcap.svg" alt="Munch logo" className="graduation-icon" />
                        </span>
                    </div>
                    <h2 className="student-title">Built for students, by students</h2>
                    <p className="student-subtitle">See what students are actually cooking, and share yours.</p>
                </div>

                {/* Freeform canvas */}
                <div className="freeform-canvas">

                    {/* Sample image */}
                    <div className="fc-item fc-image-wrap" style={{ left: '1%', top: '18%', rotate: '-5deg' }}>
                        <img src="images/tanguluimage.jpg" alt="Tangulu" className="fc-image" />
                    </div>

                    <div className="fc-item fc-image-wrap" style={{ left: '77%', top: '5%', rotate: '8deg' }}>
                        <img src="images/mochidonutsimage.jpg" alt="Mochi Donuts" className="fc-image" />
                    </div>

                    <div className="fc-item fc-image-wrap" style={{ left: '49%', top: '40%', rotate: '-4deg' }}>
                        <img src="images/bearpizzaimage.jpg" alt="Bear pizza" className="fc-image" />
                    </div>

                    <div className="fc-item fc-image-wrap" style={{ left: '30%', top: '5%', rotate: '4deg' }}>
                        <img src="images/wingsimage.JPG" alt="Wings" className="fc-image" />
                    </div>

                    <div className="fc-item fc-arrow-wrap" style={{ left: '0%', top: '75%', rotate: '-4deg' }}>
                        <img src="images/arrow1.svg" alt="arrow1" className="fc-arrow" />
                    </div>

                    <div className="fc-item fc-sticker-wrap" style={{ left: '78%', top: '56%', rotate: '-20deg' }}>
                        <img src="images/logosticker.svg" alt="Munch logo sticker" className="fc-sticker" />
                    </div>

                    <div className="fc-item fc-sticker-wrap" style={{ left: '15%', top: '0%', rotate: '5deg' }}>
                        <img src="images/wavystarshape.svg" alt="Munch logo sticker" className="fc-sticker" style={{height: '150px' }} />
                    </div>

                    <div className="fc-item fc-sticker-wrap" style={{ left: '19%', top: '50%', rotate: '12deg' }}>
                        <img src="images/fireicon.svg" alt="Fire icon" className="fc-sticker" style={{height: '110px' }} />
                    </div>

                    {/* Text block */}
                    <div className="fc-item fc-text-block" style={{ left: '50%', top: '13%', rotate: '-2deg' }}>
                        <img src="images/jonathanpfp.svg" alt="Jonathan" className="fc-text-pfp" />
                        <div className="fc-text-content">
                            <p className="fc-text-body">@jonnyo.z</p>
                            <p className="fc-text-heading">wings at ontario<br></br>hall rnnnn!!🔥</p>
                        </div>
                    </div>

                    <div className="fc-item fc-text-block" style={{ left: '35%', top: '70%', rotate: '2deg' }}>
                        <img src="images/sharonpfp.svg" alt="Sharon" className="fc-text-pfp" />
                        <div className="fc-text-content">
                            <p className="fc-text-body">@sharsjourna1</p>
                            <p className="fc-text-heading">super simple<br></br>homemade pizza :D</p>
                        </div>
                    </div>

                    <div className="fc-item fc-text-raw" style={{ left: '9%', top: '83%', rotate: '2deg' }}>
                        <p className="fc-text">hottest campus dining hall creations</p>
                    </div>


                    {/* Another rounded rect */}
                    <div className="fc-item fc-badge fc-badge-yellow" style={{ left: '70%', top: '8%', rotate: '-3deg' }}>
                        ✨ Trending this week
                    </div>
                </div>
                <Endorsement />
            </div>
        </div>
    )
}

export default Student
