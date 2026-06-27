import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { getAllProjects } from '@/lib/content'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: siteConfig.pages.projects.title,
  description: siteConfig.pages.projects.description,
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          {siteConfig.pages.projects.title}
        </h1>
        <p className="max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground text-pretty">
          {siteConfig.pages.projects.description}
        </p>
      </header>

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
                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-medium tracking-tight text-foreground">
                    {project.title}
                  </h2>
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {new Date(project.date).getFullYear()}
                  </span>
                </div>
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
    </div>
  )
}
