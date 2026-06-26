import { MDXRemote } from 'next-mdx-remote/rsc'
import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

// Map raw MDX/HTML elements to styled components. Using utility classes
// directly in JSX (rather than a `.prose` stylesheet) guarantees Tailwind
// detects and emits them.
const components = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2
      className="mt-10 mb-2 font-serif text-2xl font-medium tracking-tight text-foreground"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3
      className="mt-8 mb-2 text-lg font-semibold tracking-tight text-foreground"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mt-5 text-pretty" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => {
    const external = props.href?.startsWith('http')
    return (
      <a
        className="font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      />
    )
  },
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-foreground" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-5 marker:text-muted-foreground"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-5 marker:text-muted-foreground"
      {...props}
    />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="mt-5 border-l-2 border-border pl-4 text-muted-foreground italic"
      {...props}
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
      {...props}
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      className="mt-5 overflow-x-auto rounded-lg border border-border bg-muted p-4 font-mono text-sm leading-relaxed [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[0.85rem]"
      {...props}
    />
  ),
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={cn(
        'mt-5 block mx-auto w-full max-w-[40rem] rounded-lg border border-border',
        props.className,
      )}
      alt=""
      {...props}
    />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="my-10 border-border" {...props} />
  ),
}

export function MdxContent({ source }: { source: string }) {
  return (
    <div className="text-[0.975rem] leading-[1.75] text-foreground/90">
      <MDXRemote source={source} components={components} />
    </div>
  )
}
