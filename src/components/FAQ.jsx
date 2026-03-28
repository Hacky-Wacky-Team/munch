import { useState } from 'react'
import './FAQ.css'
import DrawUnderline from '@/components/ui/DrawUnderline'

// Add or remove items in this array to control how many FAQ rows appear.
const faqItems = [
{
    question: 'What is Munch?',
    answer:
      'A social app for sharing food, recipes, and cravings. We are building a community of food lovers who want to eat better and waste less.'
  },
  {
    question: 'When is Munch launching?',
    answer:
      'We are preparing for an early-access beta release by the end of April 2026. Join the waitlist to be the first to know when we launch and receive beta access.'
  },
  {
    question: 'Is Munch free?',
    answer:
      'Yes. The core experience will be free to use.'
  },
  {
    question: 'How is this different from Instagram or TikTok?',
    answer:
      'Munch is centered on food and cooking without the extra noise. Just recipes, inspiration, and meals that help you eat better and waste less.'
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index))
  }

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-header">
        <div className="faq-pill">
          <span className="faq-pill-text">FAQ</span>
        </div>
        <h2 id="faq-heading" className="faq-title">
          Got <DrawUnderline>questions</DrawUnderline>?
        </h2>
      </div>

      <div className="faq-list">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index

          return (
            <article
              key={item.question}
              className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
            >
              <button
                type="button"
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{item.question}</span>
                <span className={`faq-chevron ${isOpen ? 'faq-chevron-open' : ''}`} aria-hidden="true" />
              </button>

              <div
                id={`faq-answer-${index}`}
                className="faq-answer"
                role="region"
                aria-label={item.question}
              >
                <div className="faq-answer-inner">
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ