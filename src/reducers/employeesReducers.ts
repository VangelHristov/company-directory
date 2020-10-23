import {
	ADD_EMPLOYEES,
	Employee,
	EmployeesActionTypes,
	EmployeesState,
	GET_CURRENT_PAGE
} from '../actions/employees/types';

const initialState: EmployeesState = {
	all: [],
	currentPage: {
		data: [],
		page: {
			size: 20,
			number: 0,
			totalElements: 0,
			totalPages: 0
		}
	}
};

export default function employeesReducer(state: EmployeesState = initialState, action: EmployeesActionTypes) {
	switch (action.type) {

		case ADD_EMPLOYEES:
			return {
				all: state.all.concat(action.payload),
				currentPage: state.currentPage
			};

		case GET_CURRENT_PAGE:
			const {page, size} = action.payload;

			const totalElements = state.all.length ?? 0;
			const totalPages = (totalElements > 0 && size > 0) ? Math.ceil(totalElements / size) : 0;

			if (page > totalPages || page < 0) {
				return {
					all: state.all,
					currentPage: {
						data: [],
						page: {size, number: page, totalElements, totalPages}
					}
				};
			}

			const startIndex = page * size;
			const count = startIndex + size > totalElements ? totalElements : startIndex + size;

			let employees = state.all;
			if (action.payload.filter) {
				employees = employees.filter((employee: Employee) => employee.name === action.payload.filter);
			}

			return {
				all: state.all,
				currentPage: {
					data: employees.slice(startIndex, count),
					page: {size, number: page, totalElements, totalPages}
				}
			};
		default:
			return state;
	}
}
