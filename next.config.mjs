/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export so the site can be served by GitHub Pages.
  output: 'export',
  // Trailing slashes produce folder-style URLs (e.g. /blog/index.html) which
  // are the most reliable on static hosts like GitHub Pages.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required for `output: 'export'` — disables the Image Optimization API
    // which needs a server.
    unoptimized: true,
  },
  // NOTE ON HOSTING:
  // alanbaileyy.github.io is a *user* site (served from the domain root), and a
  // Cloudflare custom domain is also served from the root, so NO basePath is
  // needed. If you ever deploy to a *project* page like
  // username.github.io/repo-name, uncomment and set basePath/assetPrefix below.
  // basePath: '/repo-name',
  // assetPrefix: '/repo-name/',
}

export default nextConfig
