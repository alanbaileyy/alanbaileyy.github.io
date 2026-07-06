import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPost, formatDate } from '@/lib/content'
import { MdxContent } from '@/components/mdx-content'
import { BackLink } from '@/components/back-link'

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.summary,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="flex flex-col gap-8">
      <BackLink href="/blog" label="Writing" />

      <header className="border-b border-border/70 pb-6">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-3xl font-serif text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.4rem]">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            {post.summary && <span className="hidden h-1.5 w-1.5 rounded-full bg-border sm:inline" />}
            {post.summary && <span className="max-w-2xl text-pretty">{post.summary}</span>}
          </div>
        </div>
      </header>

      <div className="rounded-[1.2rem] bg-background/60 p-1 sm:p-2">
        <MdxContent source={post.content} />
      </div>
    </article>
  )
}
