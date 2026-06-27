import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const CONTENT_DIR = path.join(process.cwd(), 'content')

export type PostFrontmatter = {
  title: string
  date: string
  summary?: string
}

export type Post = {
  slug: string
  title: string
  date: string
  summary?: string
  content: string
}

export type ProjectFrontmatter = {
  title: string
  date: string
  summary?: string
  // If set, the project links out to this URL instead of an article page.
  externalUrl?: string
  // Optional thumbnail shown on the projects list.
  image?: string
}

export type Project = {
  slug: string
  title: string
  date: string
  summary?: string
  externalUrl?: string
  image?: string
  content: string
}

function readMdxDir(dir: string) {
  const fullDir = path.join(CONTENT_DIR, dir)
  if (!fs.existsSync(fullDir)) return []
  return fs
    .readdirSync(fullDir)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
    .map((file) => {
      const slug = file.replace(/\.mdx?$/, '')
      const raw = fs.readFileSync(path.join(fullDir, file), 'utf-8')
      const { data, content } = matter(raw)
      return { slug, data, content }
    })
}

function sortByDateDesc<T extends { date: string }>(items: T[]) {
  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )
}

// ---- Blog posts ----------------------------------------------------------
export function getAllPosts(): Post[] {
  const posts = readMdxDir('blog').map(({ slug, data, content }) => ({
    slug,
    title: (data as PostFrontmatter).title,
    date: (data as PostFrontmatter).date,
    summary: (data as PostFrontmatter).summary,
    content,
  }))
  return sortByDateDesc(posts)
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}

// ---- Projects ------------------------------------------------------------
export function getAllProjects(): Project[] {
  const projects = readMdxDir('projects').map(({ slug, data, content }) => ({
    slug,
    title: (data as ProjectFrontmatter).title,
    date: (data as ProjectFrontmatter).date,
    summary: (data as ProjectFrontmatter).summary,
    externalUrl: (data as ProjectFrontmatter).externalUrl,
    image: (data as ProjectFrontmatter).image,
    content,
  }))
  return sortByDateDesc(projects)
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((project) => project.slug === slug)
}

// Shared date formatter for consistent display.
export function formatDate(date: string) {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
