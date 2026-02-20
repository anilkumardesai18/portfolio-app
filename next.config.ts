import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile drei and three for proper Next.js compatibility
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
