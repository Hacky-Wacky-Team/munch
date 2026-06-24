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
    question: 'Do I need cooking experience to use Munch?',
    answer:
      'Not at all. Whether you’re cooking your first meal or your hundredth, Munch helps you discover recipes, learn new skills, and find inspiration in the kitchen.'
  },
  {
    question: 'Is Munch free?',
    answer:
      'Yes. Munch is free to download and use.'
  },
  {
    question: 'How is this different from Instagram or TikTok?',
    answer:
      'Munch is built specifically for food and cooking without the extra noise. Discover recipes, share your creations, and get inspired to cook without the distractions of a general social media feed.'
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  const toggleItem = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? -1 : index))
  }

  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-heading">
      <div className="faq-header">
        <div className="faq-pill">
          <span className="faq-pill-text">FAQ</span>
        </div>
        <h2 id="faq-heading" className="faq-title">
          Your questions, <DrawUnderline>answered</DrawUnderline>.
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