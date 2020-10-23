import { AnyAction } from 'redux';
import { ADD_ERROR, REMOVE_ERROR } from '../actions/errors/types';

export default function errorsReducer(state: any[] = [], action: AnyAction) {
	switch (action.type) {

		case ADD_ERROR:
			return state.concat([action.error]);

		case REMOVE_ERROR:
			return state.filter((error, i) => i !== action.index);

		default:
			return state;
	}
}
