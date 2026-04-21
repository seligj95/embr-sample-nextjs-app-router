/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output shrinks the runtime footprint and improves cold-start
  // on Embr's microVM scale-to-zero. Not required, but recommended.
  output: "standalone",
  experimental: {
    // Nothing required — keeping defaults so we exercise stock Next 15 RSC.
  },
};

export default nextConfig;
