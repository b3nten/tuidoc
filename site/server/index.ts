/// <reference types="@vonojs/vite/server" />

import { Hono } from "hono";
import shell from "#vono/html";
import { Pages } from "../client/lib/pages.ts";

let app = new Hono;

app.get("/*", async (c) => {
	let page = Pages.tryGetPage(c.req.path)
	return c.html(
		shell.replace("%head%", `<title>${ page?.meta.title ?? 'WebTUI::React'}</title>`)
	)
})

export default app;
