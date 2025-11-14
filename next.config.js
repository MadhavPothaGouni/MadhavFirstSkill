/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: "./" },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'image.tmdb.org', pathname: '/t/p/**' }
    ]
  }
}

module.exports = nextConfig
