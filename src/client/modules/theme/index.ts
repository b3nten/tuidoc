export let applyColorMode = () => {
	if(typeof window === "undefined") return;

	let colorMode = window.matchMedia("(prefers-color-scheme: dark)")

	if (colorMode.matches) {
		document.documentElement.classList.toggle("dark", true);
	} else {
		document.documentElement.classList.toggle("dark", false);
	}

	colorMode.onchange = (e => {
		if (e.matches) {
			document.documentElement.classList.toggle("dark", true);
		} else {
			document.documentElement.classList.toggle("dark", false);
		}
	})
}