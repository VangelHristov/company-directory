import { Employee } from './employee.interface';

export const FETCH_EMPLOYEES = 'GET_EMPLOYEES';
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES';

export interface AddEmployeesAction {
	type: typeof ADD_EMPLOYEES;
	payload: Employee[];
}

export interface FetchEmployeesAction {
	type: typeof FETCH_EMPLOYEES;
	payload: Employee[];
}

export interface EmployeesState {
	employees: Employee[];
}

export type EmployeesActionTypes = FetchEmployeesAction | AddEmployeesAction;
