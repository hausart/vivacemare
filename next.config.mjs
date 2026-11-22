/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_ACTIONS ? '/vivacemare' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
