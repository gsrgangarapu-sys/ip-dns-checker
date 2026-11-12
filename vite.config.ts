// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = !!process.env.VERCEL;

// Fix for @tanstack/start-plugin-core which sets rolldownOptions instead of rollupOptions for Vite 7
const fixTanstackStartRollupPlugin = {
  name: "fix-tanstack-start-rollup-options",
  configEnvironment(name: string, env: any) {
    if (env.build?.rolldownOptions) {
      env.build.rollupOptions = {
        ...env.build.rollupOptions,
        ...env.build.rolldownOptions,
      };
    }
  },
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  nitro: isVercel ? { preset: "vercel" } : true,
  vite: {
    plugins: [fixTanstackStartRollupPlugin],
  },
});
