import { useInsertionEffect, useRef } from "react";

export let useEvent = (fn: Function) => {
	const ref = useRef([fn, (...args) => ref[0](...args)]).current;
	useInsertionEffect(() => {
		ref[0] = fn;
	});
	return ref[1];
};