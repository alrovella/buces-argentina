/** @type {import('next').NextConfig} */
module.exports = {
  output: "export",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "/5g998l6p7l30l8o6/publicFiles/_public/**",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        port: "",
      },
    ],
  },
  transpilePackages: ["@repo/ui"],
  reactStrictMode: true,
  env: {
    APP_NAME: "SOHAM REMERAS",
  },
};
