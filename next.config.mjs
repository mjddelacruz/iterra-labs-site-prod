/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    const canonical = 'https://www.iterralabs.com';
    const auHosts = ['iterralabs.com.au', 'www.iterralabs.com.au'];

    return [
      ...auHosts.map((host) => ({
        source: '/:path*',
        has: [{ type: 'host', value: host }],
        destination: `${canonical}/:path*`,
        permanent: true,
      })),
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'iterralabs.com' }],
        destination: `${canonical}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
