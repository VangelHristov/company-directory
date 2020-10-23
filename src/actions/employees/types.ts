import { Employee } from './employee.interface';
import { PagingOptions } from './paging-options.interface';

export const FETCH_EMPLOYEES = 'GET_EMPLOYEES';
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES';
export const GET_PAGED_EMPLOYEES = 'GET_PAGED_EMPLOYEES';

export interface AddEmployeesAction {
	type: typeof ADD_EMPLOYEES;
	payload: Employee[];
}

export interface FetchEmployeesAction {
	type: typeof FETCH_EMPLOYEES;
	payload: Employee[];
}

export interface GetPagedEmployeesAction {
	type: typeof GET_PAGED_EMPLOYEES;
	payload: PagingOptions
}

export interface EmployeesState {
	employees: Employee[];
}

export type EmployeesActionTypes = FetchEmployeesAction | AddEmployeesAction | GetPagedEmployeesAction;
