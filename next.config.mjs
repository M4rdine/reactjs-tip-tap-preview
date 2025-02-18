/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  transpilePackages: ['shiki', 'react-tweet'],
};

export default nextConfig;
