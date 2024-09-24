/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com', // hosting image
      },
    ],
  },

  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
