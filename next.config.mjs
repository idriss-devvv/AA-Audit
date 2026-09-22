/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Le lint ne doit pas bloquer les premiers déploiements de démonstration.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
