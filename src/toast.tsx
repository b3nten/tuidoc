import { createContext, PropsWithChildren, useState } from "react";
import { Toast as ToastImpl } from "radix-ui"

export let ToastContext = createContext<(toast: any) => void>((() => void 0) as any);

export let ToastProvider = (props: PropsWithChildren) => {
	let [toasts, setToasts] = useState<any[]>([])

	let addToast = (toast: any) => {
		setToasts((prev) => [...prev, toast])
		setTimeout(() => {
			setToasts((prev) => prev.filter(t => t !== toast))
		}, 3000)
	}

	return (
		<ToastImpl.Provider>
			<ToastContext.Provider value={addToast}>
				{props.children}
				<ToastImpl.Viewport className={"fixed top-0"}>
					{toasts.map(t => (
						<ToastImpl.Root>
							<div>{ t }</div>
						</ToastImpl.Root>
					))}
				</ToastImpl.Viewport>
			</ToastContext.Provider>
		</ToastImpl.Provider>
	)
}