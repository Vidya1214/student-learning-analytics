/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: false,
  },
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
