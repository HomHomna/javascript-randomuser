/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design',
    'rc-util',
    'rc-pagination',
    "rc-picker",
    "rc-tree",
    "rc-table",
  ],
  images: {
    // domains: ['*'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
