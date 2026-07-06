import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { siteConfig } from '@/lib/site'
import { getAllPosts, getAllProjects, formatDate } from '@/lib/content'

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3)
  const projects = getAllProjects().slice(0, 4)

  return (
    <div className="flex flex-col gap-16">
      {/* Intro */}
      <section className="relative overflow-hidden rounded-[1.6rem] border border-border/80 bg-gradient-to-br from-background via-accent-muted/50 to-background p-6 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.25)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(84,157,99,0.16),_transparent_40%)]" />
        <div className="relative flex flex-col gap-6 lg:items-start lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-background/70 px-3 py-1 text-[0.7rem] font-medium tracking-[0.24em] text-accent uppercase backdrop-blur">
              <span className="size-2 rounded-full bg-accent" />
              {siteConfig.hero.badge}
            </div>
            <h1 className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {siteConfig.name}
            </h1>
            <div className="flex max-w-xl flex-col gap-4 text-[0.975rem] leading-relaxed text-muted-foreground">
              {siteConfig.intro.map((paragraph, i) => (
                <p key={i} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recent writing — large button rows */}
      <HomeSection title="Writing" href="/blog" linkLabel="All writing">
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-gradient-to-r from-background/90 via-muted/70 to-background/90 px-5 py-4 shadow-[0_8px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-muted"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium tracking-tight text-foreground">
                    {post.title}
                  </span>
                  {post.summary && (
                    <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {post.summary}
                    </span>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
                    {formatDate(post.date)}
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </HomeSection>

      {/* Selected projects — large image cards */}
      <HomeSection title="Projects" href="/projects" linkLabel="All projects">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            const isExternal = Boolean(project.externalUrl)
            const href = isExternal
              ? (project.externalUrl as string)
              : `/projects/${project.slug}`

            const card = (
              <article className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-gradient-to-br from-background/90 via-muted/70 to-background/90 p-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-muted">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs tracking-wide text-muted-foreground">
                    Projects · {project.title}
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-accent" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-background">
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={`Preview of ${project.title}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  {project.summary && (
                    <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                      {project.summary}
                    </p>
                  )}
                </div>
              </article>
            )

            return (
              <li key={project.slug} className="flex">
                {isExternal ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full"
                  >
                    {card}
                  </a>
                ) : (
                  <Link href={href} className="flex w-full">
                    {card}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </HomeSection>
    </div>
  )
}

function HomeSection({
  title,
  href,
  linkLabel,
  children,
}: {
  title: string
  href: string
  linkLabel: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-baseline justify-between border-b border-border pb-2">
        <h2 className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {title}
        </h2>
        <Link
          href={href}
          className="text-sm text-muted-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
        >
          {linkLabel}
        </Link>
      </div>
      {children}
    </section>
  )
}
