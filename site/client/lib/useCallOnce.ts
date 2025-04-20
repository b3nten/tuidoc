import { useRef } from "react";

let NOT_CALLED = Symbol("NOT_CALLED");

export let useCallOnce = <Args extends any[], T>(
	fn: (...args: Args) => T
): (...args: Args) => T  => {
	let result = useRef<T>(NOT_CALLED as T);
	return (...args: Args) => {
		if(result.current === NOT_CALLED) {
			result.current = fn(...args);
		}
		return result.current;
	}
}