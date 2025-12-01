/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@credit-scoring/shared'],
  async headers() {
    return [
      {
        // Allow CORS for API routes so the widget can fetch configs
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
