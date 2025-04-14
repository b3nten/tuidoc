/// <reference types="@vonojs/vite/server" />

import { Hono } from "hono";
import shell from "#vono/html";

let app = new Hono;

app.get("*", async (c) => {
	return c.html(
		shell.replace("%head%", `<title>Hello!</title>`)
	)
})

export default app;
