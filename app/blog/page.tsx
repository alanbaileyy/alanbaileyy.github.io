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

  // Group posts by year for a clean, scannable archive.
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, post) => {
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

      <div className="flex flex-col gap-8">
        {years.map((year) => (
          <section key={year} className="flex flex-col gap-3">
            <h2 className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {year}
            </h2>
            <ul className="flex flex-col gap-3">
              {grouped[year].map((post) => (
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
          </section>
        ))}
      </div>
    </div>
  )
}
