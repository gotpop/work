import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@gotpop/system", "@gotpop/storyblok"],
  experimental: {
    optimizePackageImports: ["@gotpop/system"],
  },
  images: {
    domains: ["a.storyblok.com"],
  },
}

export default nextConfig
