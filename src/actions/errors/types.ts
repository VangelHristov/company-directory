export const ADD_ERROR = 'NETWORK_ERROR';
export const REMOVE_ERROR = 'REMOVE_ERROR';

export interface AddErrorAction {
	type: typeof ADD_ERROR;
	payload: Error
}

export interface RemoveErrorAction {
	type: typeof REMOVE_ERROR;
	payload: string
}

export type ErrorAction = AddErrorAction | RemoveErrorAction;
