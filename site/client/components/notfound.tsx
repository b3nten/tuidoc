import { useLocation, useRouter } from "wouter";
import { useEvent } from "../lib/useevent.ts";
import { use, useLayoutEffect } from "react";
import { useCallOnce } from "../lib/useCallOnce.ts";
import { ToastContext } from "../../../src/toast.tsx";

export const NotFound = (
	props: {
		to: string,
		options?: { replace?: boolean, state?: any },
	}
) => {
	let { to } = props;
	let router = useRouter()
	let [path, navigate] = useLocation();
	let redirect = useEvent(() => navigate(to, props.options));

	let sendToast = use(ToastContext)
	let caller = useCallOnce(() => sendToast(`Page ${path} not found. Redirecting.`) )
	let { ssrContext } = router as any;

	useLayoutEffect(() => {
		caller()
		redirect();
	}, []);

	if (ssrContext) {
		ssrContext.redirectTo = to;
	}

	return null;
};