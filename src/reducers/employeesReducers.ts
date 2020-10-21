import { Action } from 'redux';
import {Employee} from '../actions/interfaces';
import {ADD_EMPLOYEES, GET_EMPLOYEES, SAVE_BACKGROUND, SAVE_EMPLOYEE_LABEL} from '../actions/types';

export default function employeesReducer(state: any[] = [], action: any) {
	switch (action.type) {

		case ADD_EMPLOYEES:
			return [ ...action.payload];
		default:
			return state;
	}
}
