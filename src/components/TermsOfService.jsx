import LegalPage from './LegalPage'

const LAST_UPDATED = 'May 8, 2026'

const SECTIONS = [
  {
    title: '1. Eligibility',
    body:
      'You must be at least 13 years old to use Munch. If you are under the age of digital consent in your region, you may require parental permission.',
  },
  {
    title: '2. Your account',
    body:
      'You are responsible for maintaining your account and all activity under it. You must provide accurate information and keep your login details secure.',
  },
  {
    title: '3. Public content',
    body:
      'All content you post on Munch is public. This includes your profile, posts, comments, likes, and interactions. You should assume anything you post may be viewed by anyone.',
  },
  {
    title: '4. User content',
    body:
      'You retain ownership of your content, but you grant Munch a non-exclusive, worldwide license to display, distribute, and operate it within the app. You must not post illegal, harmful, abusive, or infringing content.',
  },
  {
    title: '5. Community behavior',
    body:
      'You agree to use Munch respectfully. Harassment, spam, impersonation, or attempts to disrupt the platform are not allowed.',
  },
  {
    title: '6. External links',
    body:
      'Munch may contain links to third-party websites. We are not responsible for external content, safety, or consequences resulting from visiting those links.',
  },
  {
    title: '7. No guarantees',
    body:
      'Munch is provided without warranties of any kind. We do not guarantee that the app will always be available, error-free, or safe from misuse by others.',
  },
  {
    title: '8. Limitation of liability',
    body:
      'To the maximum extent permitted by law, Munch is not responsible for any damages, losses, or issues arising from your use of the app or interactions with other users.',
  },
  {
    title: '9. Changes to the service',
    body:
      'We may update, modify, or discontinue parts of the app at any time without notice.',
  },
]

function TermsOfService() {
  return (
    <LegalPage
      title="Terms of Use"
      lastUpdated={LAST_UPDATED}
      intro="These Terms of Use govern your access to and use of Munch. By using the app, you agree to these terms."
      sections={SECTIONS}
    />
  )
}

export default TermsOfService
