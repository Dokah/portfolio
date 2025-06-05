import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return defineConfig({
      plugins: [
          remix(),
          netlifyPlugin(),
          tsconfigPaths(),
      ],
      define: {
        'process.env': env
      }
  });
}
