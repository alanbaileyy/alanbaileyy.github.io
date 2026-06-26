'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { siteConfig } from '@/lib/site'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Writing' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })

  const currentIndex = useMemo(
    () => navItems.findIndex((item) => (item.href === '/' ? pathname === '/' : pathname.startsWith(item.href))),
    [pathname],
  )

  const activeIndex = hoverIndex ?? (currentIndex === -1 ? 0 : currentIndex)

  const updateIndicator = useCallback(
    (index: number) => {
      const nav = navRef.current
      const item = itemRefs.current[index]

      if (!nav || !item) {
        return
      }

      const navRect = nav.getBoundingClientRect()
      const itemRect = item.getBoundingClientRect()

      setIndicatorStyle({
        left: itemRect.left - navRect.left,
        width: itemRect.width,
      })
    },
    [],
  )

  useEffect(() => {
    updateIndicator(activeIndex)
  }, [activeIndex, updateIndicator])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <header className="flex items-center justify-end">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl justify-center px-4 py-4 sm:px-6 sm:py-6 md:justify-start">
          <nav
            ref={navRef}
            className="relative pointer-events-auto inline-flex items-center gap-1 overflow-hidden rounded-full border border-border/60 bg-background/70 p-1 text-sm shadow-sm backdrop-blur-md"
          >
            <div
              className="pointer-events-none absolute top-1 h-[calc(100%-0.5rem)] rounded-full bg-[rgba(84,157,99,0.18)] shadow-[0_0_18px_rgba(84,157,99,0.22)] transition-all duration-300 ease-out"
              style={{ left: indicatorStyle.left + 2, width: Math.max(indicatorStyle.width - 4, 0) }}
            />
            {navItems.map((item, index) => {
              const active = isActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  ref={(element) => {
                    itemRefs.current[index] = element
                  }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  onFocus={() => setHoverIndex(index)}
                  onBlur={() => setHoverIndex(null)}
                  className={cn(
                    'relative z-10 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-200',
                    active ? 'text-slate-950' : 'text-muted-foreground hover:text-slate-950',
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      <div className="hidden items-center gap-x-5 text-sm md:flex">
        <a
          href={siteConfig.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          LinkedIn
          <ArrowUpRight className="size-3.5" />
        </a>
        <a
          href={siteConfig.links.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
        >
          Resume
          <ArrowUpRight className="size-3.5" />
        </a>
      </div>
    </header>
  )
}
