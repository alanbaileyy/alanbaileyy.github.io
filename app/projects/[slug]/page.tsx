import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllProjects, getProject, formatDate } from '@/lib/content'
import { MdxContent } from '@/components/mdx-content'
import { BackLink } from '@/components/back-link'

// Only generate pages for projects that are articles (no externalUrl).
export function generateStaticParams() {
  return getAllProjects()
    .filter((project) => !project.externalUrl)
    .map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.summary,
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project || project.externalUrl) {
    notFound()
  }

  return (
    <article className="flex flex-col gap-8">
      <BackLink href="/projects" label="Projects" />

      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-balance">
          {project.title}
        </h1>
        <p className="text-sm text-muted-foreground">
          {formatDate(project.date)}
        </p>
        {project.summary && (
          <p className="text-[0.975rem] leading-relaxed text-pretty text-muted-foreground">
            {project.summary}
          </p>
        )}
      </header>

      <MdxContent source={project.content} />
    </article>
  )
}
