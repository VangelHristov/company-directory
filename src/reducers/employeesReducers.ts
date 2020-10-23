import { ADD_EMPLOYEES, EmployeesActionTypes, EmployeesState, GET_PAGED_EMPLOYEES } from '../actions/employees/types';

const initialState: EmployeesState = {
	employees: []
};

export default function employeesReducer(state: EmployeesState = initialState, action: EmployeesActionTypes) {
	switch (action.type) {

		case ADD_EMPLOYEES:
			return {
				employees: state.employees.concat(action.payload)
			};
		case GET_PAGED_EMPLOYEES:
			const {page, size} = action.payload;
			const startIndex = page * size;

			return {
				employees: state.employees.slice(startIndex, startIndex + size)
			};
		default:
			return state;
	}
}
