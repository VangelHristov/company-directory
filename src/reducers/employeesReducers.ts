import { ADD_EMPLOYEES, EmployeesActionTypes, EmployeesState } from '../actions/employees/types';

const initialState: EmployeesState = {
	employees: []
};

export default function employeesReducer(state: EmployeesState = initialState, action: EmployeesActionTypes) {
	switch (action.type) {

		case ADD_EMPLOYEES:
			return {
				employees: state.employees.concat(action.payload)
			};
		default:
			return state;
	}
}
