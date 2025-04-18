import { CSSProperties, useMemo } from "react";

export type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never

export let useMergedStyles = (
	...styles: Array<Record<string, any> | undefined | null>
): CSSProperties => useMemo(
	() => Object.assign({}, ...styles), styles)

export let noop = () => void 0;