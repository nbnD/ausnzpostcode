const isGithubPages = process.env.GITHUB_PAGES === "true";
const repositoryName = "ausnzpostcode";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: isGithubPages ? `/${repositoryName}` : "",
  assetPrefix: isGithubPages ? `/${repositoryName}/` : ""
};

export default nextConfig;
