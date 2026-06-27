// ---------------------------------------------------------------------------
// EDIT ME: This is the single place to update your personal info and links.
// ---------------------------------------------------------------------------
export const siteConfig = {
  name: 'Alan Bailey',
  role: 'Electrical Engineer',
  title: 'Alan Bailey',
  // Used for SEO/OpenGraph absolute URLs. Update to your custom domain when set.
  url: 'https://alanbaileyy.github.io',
  description:
    'Alan Bailey is an electrical engineering student sharing projects, experiments, and writing on sustainability, clean energy, and practical engineering.',

  // Short intro shown on the home page.
  intro: [
    "I'm an electrical engineer interested in sustainability. I'm passionate about using technology to improve environmental issues.",
    'This is my corner of the internet where I share what I build and write down what I learn along the way.',
  ],

  pages: {
    projects: {
      title: 'Projects',
      description: 'Currently a work in progress. Things I have built, and designed.',
      titleTemplate: 'Projects — %s',
    },
    writing: {
      title: 'Writing',
      description: 'Notes, essays, and the occasional deep dive.',
      titleTemplate: 'Writing — %s',
    },
  },

  // External links shown on the right side of the header.
  // The resume points to a PDF placed in /public.
  links: {
    linkedin: 'https://www.linkedin.com/in/alanbaileyy/',
    resume: '/resume.pdf',
    // Optional extras shown in the footer — leave as empty string to hide.
    github: 'https://github.com/alanbaileyy',
    email: 'alanbailey034@gmail.com',
  },
}

export type SiteConfig = typeof siteConfig
