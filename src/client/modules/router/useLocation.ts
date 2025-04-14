import { useSyncExternalStore } from "react";

const eventPopstate = "popstate";
const eventPushState = "pushState";
const eventReplaceState = "replaceState";
const eventHashchange = "hashchange";
const events = [
	eventPopstate,
	eventPushState,
	eventReplaceState,
	eventHashchange,
] as const;

const subscribeToLocationUpdates = (callback: EventListenerOrEventListenerObject) => {
	for (const event of events) {
		addEventListener(event, callback);
	}
	return () => {
		for (const event of events) {
			removeEventListener(event, callback);
		}
	};
};

export const useLocationProperty = (fn: () => unknown, ssrFn: () => unknown) =>
	useSyncExternalStore(subscribeToLocationUpdates, fn, ssrFn);

const currentSearch = () => location.search;

export const useSearch = ({ ssrSearch = "" } = {}) =>
	useLocationProperty(currentSearch, () => ssrSearch);

const currentPathname = () => location.pathname;

export const usePathname = (args: { ssrPath?: string } = {}) =>
	useLocationProperty(
		currentPathname,
		args.ssrPath ? () => args.ssrPath : currentPathname
	);

const currentHistoryState = () => history.state;
export const useHistoryState = () =>
	useLocationProperty(currentHistoryState, () => null);

export const navigate = (to: string, { replace = false, state = null } = {}) =>
	history[replace ? eventReplaceState : eventPushState](state, "", to);

export const useBrowserLocation = (opts = {}) => [usePathname(opts), navigate];

const patchKey = Symbol.for("brouter_v3");

declare global {
	interface Window {
		[patchKey]: boolean;
	}
}

if (typeof history !== "undefined" && typeof window[patchKey] === "undefined") {
	for (const type of [eventPushState, eventReplaceState]) {
		const original = history[type];
		// TODO: we should be using unstable_batchedUpdates to avoid multiple re-renders,
		// however that will require an additional peer dependency on react-dom.
		// See: https://github.com/reactwg/react-18/discussions/86#discussioncomment-1567149
		history[type] = function () {
			const result = original.apply(this, arguments);
			const event = new Event(type);
			event.arguments = arguments;

			dispatchEvent(event);
			return result;
		};
	}
	Object.defineProperty(window, patchKey, { value: true });
}
