/// <reference types="@vonojs/vite/server" />

import { Hono } from "hono";
import shell from "#vono/html";

let app = new Hono;

app.get("*", async (c) => {
	console.log(shell)
	return c.html(
		shell
	)
})

export default app;
