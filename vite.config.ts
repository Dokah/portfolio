import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-edge-adapter/plugin";
import {config} from "dotenv";
config()

export default defineConfig({
  plugins: [remix(), netlifyPlugin(), tsconfigPaths()],
  ssr: {
    external: ["@remix-run/node", "nodemailer"],
    noExternal: [], 
  },
  define: {
    "process.env.SENDGRID_API_KEY": JSON.stringify(process.env.SENDGRID_API_KEY),
    "process.env.SENDGRID_TO_EMAIL": JSON.stringify(process.env.SENDGRID_TO_EMAIL),
    "process.env.SENDGRID_FROM_EMAIL": JSON.stringify(process.env.SENDGRID_FROM_EMAIL), 
    "process.env.RECAPTCHA_SECRET_KEY": JSON.stringify(process.env.RECAPTCHA_SECRET_KEY),
  }
});
