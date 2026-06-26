import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4 py-12">
      <h1 className="font-serif text-3xl font-medium tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-accent underline decoration-accent/30 underline-offset-2 transition-colors hover:decoration-accent"
      >
        Back home
      </Link>
    </div>
  )
}
