import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "download.logo.wine",
      },
      {
        protocol: "https",
        hostname: "*.cisco.com",
      },
      {
        protocol: "https",
        hostname: "*.liblogo.com",
      },{
        protocol: "https",
        hostname: "*.ruckuswireless.com",
      },{
        protocol: "https",
        hostname: "*.sourcesecurity.com",
      },
      {
        protocol: "https",
        hostname: "*.aikomtech.com",
      },{
        protocol: "https",
        hostname: "i0.wp.com",
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: true,
  async headers() {
    const headersArray = [];

    if (!process.env.NEXT_PUBLIC_IS_LIVE) {
      headersArray.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }

    return headersArray;
  },
};

export default nextConfig;
