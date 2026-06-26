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
      <section className="flex flex-col gap-5">
        <h1 className="font-serif text-4xl font-medium tracking-tight text-balance sm:text-5xl">
          {siteConfig.name}
        </h1>
        <div className="flex max-w-xl flex-col gap-4 text-[0.975rem] leading-relaxed text-muted-foreground">
          {siteConfig.intro.map((paragraph, i) => (
            <p key={i} className="text-pretty">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Selected projects — large image cards */}
      <HomeSection title="Projects" href="/projects" linkLabel="All projects">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => {
            const isExternal = Boolean(project.externalUrl)
            const href = isExternal
              ? (project.externalUrl as string)
              : `/projects/${project.slug}`

            const card = (
              <article className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:border-accent/40 hover:bg-accent-muted">
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

      {/* Recent writing — large button rows */}
      <HomeSection title="Writing" href="/blog" linkLabel="All writing">
        <ul className="flex flex-col gap-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 px-5 py-4 transition-colors hover:border-accent/40 hover:bg-accent-muted"
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
