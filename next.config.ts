import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
  }
  /* config options here */
};

export default nextConfig;
