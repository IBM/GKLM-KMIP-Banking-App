/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Match all requests starting with /api
        destination: "http://127.0.0.1:8080/:path*", // Rewrite to this base URL
      },
    ];
  },
  reactStrictMode: false,
};

export default nextConfig;
