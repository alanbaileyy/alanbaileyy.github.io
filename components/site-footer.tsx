import { siteConfig } from '@/lib/site'

export function SiteFooter() {
  const { github, email, linkedin, resume } = siteConfig.links

  const links = [
    github && { label: 'GitHub', href: github },
    email && { label: 'Email', href: `mailto:${email}` },
  ].filter(Boolean) as { label: string; href: string }[]

  const mobileLinks = [
    linkedin && { label: 'LinkedIn', href: linkedin },
    resume && { label: 'Resume', href: resume },
  ].filter(Boolean) as { label: string; href: string }[]

  return (
    <footer className="flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {siteConfig.name}
      </p>
      <div className="flex flex-wrap gap-x-4 gap-y-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="transition-colors hover:text-foreground"
          >
            {link.label}
          </a>
        ))}
      </div>
      {mobileLinks.length > 0 ? (
        <div className="flex flex-wrap gap-x-4 gap-y-1 md:hidden">
          {mobileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </footer>
  )
}
