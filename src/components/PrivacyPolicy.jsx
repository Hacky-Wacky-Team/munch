import LegalPage from './LegalPage'

const LAST_UPDATED = 'May 8, 2026'

const SECTIONS = [
  {
    title: '1. Information we collect',
    body:
      'Munch collects basic account information such as your name, email address, username, and any profile information you choose to add. We also collect content you post, such as food posts, captions, comments, and interactions within the app.',
  },
  {
    title: '2. Public profiles',
    body:
      'All Munch accounts are public by default. This means your profile, posts, comments, and activity may be visible to other users and may be shared or discovered outside the app.',
  },
  {
    title: '3. How we use information',
    body:
      'We use your information to operate the app, display content, personalize your experience, improve features, and maintain platform safety and performance.',
  },
  {
    title: '4. Sharing of information',
    body:
      'We do not sell your personal information. Some data may be shared with trusted third-party service providers that help operate the app (such as hosting or analytics).',
  },
  {
    title: '5. External links',
    body:
      'Munch may contain links to third-party websites or services. We do not control these websites and are not responsible for their content, policies, or actions. Users access external links at their own risk.',
  },
  {
    title: '6. Safety and liability',
    body:
      'Munch is provided “as is.” We are not responsible for any loss, harm, or damages that may result from using the app, interacting with other users, or content posted by users.',
  },
  {
    title: '7. Age requirement',
    body:
      'You must be at least 13 years old to use Munch. If you are under the age of digital consent in your region, you may only use the app with parental permission.',
  },
]

function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro="This Privacy Policy explains what information Munch collects, how it is used, and how it is handled when you use the app."
      sections={SECTIONS}
    />
  )
}

export default PrivacyPolicy
