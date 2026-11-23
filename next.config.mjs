/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '',
  env: {
    NEXT_PUBLIC_BASE_PATH: '',
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
