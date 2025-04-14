import react from "@vitejs/plugin-react-swc";
import { CloudflareAdaptor, vono } from "@vonojs/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";

export default defineConfig({
	plugins: [
		tailwindcss(),
		vono({
			server: "src/server/index.ts",
			adaptor: CloudflareAdaptor,
			preserveHtml: false,
		}),
		mdx(),
		react(),
	],
	build: {
		rollupOptions: {
			input: "src/client/main.html",
		},
	},
});
