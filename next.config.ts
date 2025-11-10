import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "miesta.com.tr",
        pathname: "/yonetim/icerikresimleri/**",
      },
      {
        protocol: "https",
        hostname: "miesta.com.tr",
        pathname: "/logo.png",
      },
    ],
  },
};

export default nextConfig;
