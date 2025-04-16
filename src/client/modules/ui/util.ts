import { CSSProperties, useMemo } from "react";

export type DistributiveOmit<T, K extends keyof any> = T extends any
	? Omit<T, K>
	: never

export const EMPTY_OBJECT = Object.freeze({})

export let noop = () => void 0;

export let useMergedStyles = (
	...styles: Array<Record<string, any> | undefined | null>
): CSSProperties => useMemo(
	() => styles.length === 1 ? styles[0] : Object.assign({}, ...styles.filter(Boolean)), styles)

export let boxType = (box: any) => typeof box === "string" ? box : (box ? "square" : undefined);


