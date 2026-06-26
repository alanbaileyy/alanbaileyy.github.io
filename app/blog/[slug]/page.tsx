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

      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-3xl font-medium tracking-tight text-balance">
          {post.title}
        </h1>
        <p className="text-sm text-muted-foreground">{formatDate(post.date)}</p>
      </header>

      <MdxContent source={post.content} />
    </article>
  )
}
