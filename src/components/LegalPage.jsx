import { useEffect } from 'react'
import Navbar from './Navbar'
import './LegalPage.css'

function LegalPage({ title, lastUpdated, intro, sections }) {
  useEffect(() => {
    document.title = `${title} | Munch`
  }, [title])

  return (
    <>
      <Navbar isDarkSection={false} />
      <main className="legal-page">
        <article className="legal-page-content">
          <header>
            <h1 className="legal-page-title">{title}</h1>
          </header>

          <div className="legal-card">
            <p className="legal-updated">Last updated: {lastUpdated}</p>
            <p className="legal-paragraph">{intro}</p>
          </div>

          {sections.map((section) => (
            <section key={section.title} className="legal-section">
              <h2 className="legal-section-title">{section.title}</h2>
              <p className="legal-paragraph">{section.body}</p>
            </section>
          ))}
        </article>
      </main>
    </>
  )
}

export default LegalPage
