/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['assets.coingecko.com', 'coin-images.coingecko.com'],
  },
  env: {
    NEXT_PUBLIC_MINIKIT_API_KEY: process.env.NEXT_PUBLIC_MINIKIT_API_KEY,
    NEXT_PUBLIC_ONCHAINKIT_API_KEY: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY,
  },
};

export default nextConfig;
