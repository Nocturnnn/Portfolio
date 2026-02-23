import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/projetos/neuroflow-ai",
  assetPrefix: "/projetos/neuroflow-ai",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;