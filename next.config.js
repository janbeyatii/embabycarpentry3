/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Ensure proper routing for Vercel
  trailingSlash: false,
}

module.exports = nextConfig
