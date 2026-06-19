// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";
import fs from "fs";
import path from "path";

function generatePhotosJson() {
  const photosDir = path.join(process.cwd(), "public", "Photos");
  const outputFile = path.join(process.cwd(), "public", "photos.json");
  try {
    if (!fs.existsSync(photosDir)) {
      fs.mkdirSync(photosDir, { recursive: true });
    }
    const files = fs.readdirSync(photosDir);
    const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const photoFiles = files.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return validExtensions.includes(ext);
    });
    fs.writeFileSync(outputFile, JSON.stringify(photoFiles, null, 2));
    console.log(`[Photos Plugin] Generated photos.json with ${photoFiles.length} photos.`);
  } catch (err) {
    console.error("[Photos Plugin] Error generating photos.json:", err);
  }
}

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nitro({
        preset: "vercel",
      }),
      {
        name: "generate-photos-list",
        buildStart() {
          generatePhotosJson();
        },
        configureServer(server) {
          const photosDir = path.join(process.cwd(), "public", "Photos");
          server.watcher.add(photosDir);
          const onChange = (filePath: string) => {
            if (filePath.includes("public/Photos") || filePath.includes("public\\Photos")) {
              generatePhotosJson();
            }
          };
          server.watcher.on("add", onChange);
          server.watcher.on("unlink", onChange);
        },
      },
    ],
  },
});
