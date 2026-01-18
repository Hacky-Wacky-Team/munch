import './Endorsement.css'

function Endorsement() {
  return (
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
  )
}

export default Endorsement
