export interface Msg {}
export type Cmd = (dispatch: (msg: Msg) => void) => Msg | void

export interface Machine<State> {
	onMsg: (msg: Msg, state: State) => [Partial<State>, ...rest: Array<Msg | Cmd>] | void;
}