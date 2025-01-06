/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,

  },
  images: {
    domains: [process.env.NEXT_PUBLIC_SITE_URL],
    remotePatterns: [
    
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SITE_URL,
        pathname: '/**', // for all resource
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
    
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
      },
    ],
  },

};

module.exports = nextConfig;
