/// <reference types="@vonojs/vite/server" />

import { Hono } from "hono";
import shell from "#vono/html";

let pageContents = Object.entries(
	import.meta.glob<{ default: Function }>(
		"../../pages/**/*.mdx",
		{ import: "meta" }
	)).reduce((acc, [path, doc]) => {
		acc[path.replace("../../pages", "").replace(".mdx", "")] = doc
		return acc;
	}, {} as Record<string, () => Promise<any>>)

let pageLinks = Object.entries(
	import.meta.glob<{ default: string }>(
		"../../pages/**/*.mdx",
		{ query: "?url", eager: true }
	)).reduce((acc, [path, doc]) => {
		acc[path.replace("../../pages", "").replace(".mdx", "")] = doc
		return acc;
	}, {} as Record<string, { default: string }>)

let app = new Hono;

app.get("/*", async (c) => {
	let path = c.req.path
	if(!path || !pageContents[path]) {
		return c.html(
			shell.replace("%head%", "<title>WebTUI::React</title>")
		)
	}
	let meta = await pageContents[path]()
	return c.html(
		shell.replace("%head%", `
			<link rel="modulepreload" href="${pageLinks[path].default}">
			<title>Docs: ${meta.title}</title>
		`)
	)
})

export default app;
