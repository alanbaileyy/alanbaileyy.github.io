import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getAllPosts, formatDate } from '@/lib/content'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: siteConfig.pages.writing.title,
  description: siteConfig.pages.writing.description,
}

export default function BlogPage() {
  const posts = getAllPosts()
  const featuredPost = posts[0]
  const archivePosts = posts.slice(1)

  // Group posts by year for a clean, scannable archive.
  const grouped = archivePosts.reduce<Record<string, typeof archivePosts>>((acc, post) => {
    const year = new Date(post.date).getFullYear().toString()
    ;(acc[year] ??= []).push(post)
    return acc
  }, {})
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-3">
        <h1 className="font-serif text-4xl font-medium tracking-tight">
          {siteConfig.pages.writing.title}
        </h1>
        <p className="max-w-xl text-[0.975rem] leading-relaxed text-muted-foreground text-pretty">
          {siteConfig.pages.writing.description}
        </p>
      </header>

      {featuredPost && (
        <section className="rounded-[1.4rem] border border-border/80 bg-gradient-to-br from-background via-accent-muted/50 to-background p-5 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.28)] sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-3">
              <span className="w-fit rounded-full border border-accent/20 bg-background/70 px-3 py-1 text-[0.65rem] font-medium tracking-[0.24em] text-accent uppercase backdrop-blur">
                Recent
              </span>
              <Link href={`/blog/${featuredPost.slug}`} className="group">
                <h2 className="font-serif text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {featuredPost.title}
                </h2>
              </Link>
              {featuredPost.summary && (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
                  {featuredPost.summary}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="font-mono text-xs tracking-wide">{formatDate(featuredPost.date)}</span>
              <ArrowRight className="size-4 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
          </div>
        </section>
      )}

      <div className="flex flex-col gap-8">
        {years.map((year) => (
          <section key={year} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {year}
            </h2>
            <ul className="grid gap-3 lg:grid-cols-2">
              {grouped[year].map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-border bg-gradient-to-br from-background/90 via-muted/70 to-background/90 px-5 py-4 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.3)] transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-muted"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-mono text-[0.7rem] tracking-[0.2em] text-muted-foreground uppercase">
                          {formatDate(post.date)}
                        </span>
                        <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
                      </div>
                      <span className="font-medium tracking-tight text-foreground">
                        {post.title}
                      </span>
                      {post.summary && (
                        <span className="text-sm leading-relaxed text-pretty text-muted-foreground">
                          {post.summary}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  )
}
