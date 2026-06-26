// ---------------------------------------------------------------------------
// EDIT ME: This is the single place to update your personal info and links.
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: 'Alan Bailey',
  role: 'Electrical Engineer',
  // Used for SEO/OpenGraph absolute URLs. Update to your custom domain when set.
  url: 'https://alanbaileyy.github.io',
  description:
    'Personal site of Alan Bailey — electrical engineer focused on sustainability and clean energy. Projects, writing, and experiments.',

  // Short intro shown on the home page.
  intro: [
    "I'm an electrical engineer interested in sustainability and clean energy. I care about designing systems that use power efficiently — from the circuit level up to the grid.",
    'This is my corner of the internet where I share what I build and write down what I learn along the way.',
  ],

  // External links shown on the right side of the header.
  // The resume points to a PDF placed in /public.
  links: {
    linkedin: 'https://www.linkedin.com/in/your-handle',
    resume: '/resume.pdf',
    // Optional extras shown in the footer — leave as empty string to hide.
    github: 'https://github.com/alanbaileyy',
    email: 'you@example.com',
  },
}

export type SiteConfig = typeof siteConfig
