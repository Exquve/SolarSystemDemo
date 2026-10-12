import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages için base path otomatik ayarlama
// GITHUB_REPOSITORY env'i "owner/repo-name" formatında gelir
function getBasePath() {
  // Manuel override (workflow'dan veya env'den)
  if (process.env.BASE_URL) return process.env.BASE_URL;

  // GitHub Actions ortamında otomatik tespit
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split("/")[1];
    // Eğer repo "username.github.io" formatındaysa base "/" olur
    const owner = process.env.GITHUB_REPOSITORY.split("/")[0];
    if (repoName === `${owner}.github.io`) return "/";
    return `/${repoName}/`;
  }

  // Yerel geliştirme
  return "/";
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: getBasePath(),
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
  },
});
