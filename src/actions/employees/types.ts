export const FETCH_EMPLOYEES = 'GET_EMPLOYEES';
export const ADD_EMPLOYEES = 'ADD_EMPLOYEES';
export const GET_CURRENT_PAGE = 'GET_CURRENT_PAGE';

export interface PageOptions {
	size: number;
	page: number;
	filter: string | null;
}

export interface Employee {
	uuid: string;
	company: string;
	bio: string;
	name: string;
	title: string;
	avatar: string;
}

export interface GetCurrentPageAction {
	type: typeof GET_CURRENT_PAGE;
	payload: PageOptions
}

export interface AddEmployeesAction {
	type: typeof ADD_EMPLOYEES;
	payload: Employee[];
}

export interface FetchEmployeesAction {
	type: typeof FETCH_EMPLOYEES;
	payload: Employee[];
}

export interface EmployeesState {
	all: Employee[];
	currentPage: CurrentPageState;
}

export interface CurrentPageState {
	data: Employee[];
	page: {
		number: number;
		size: number;
		totalElements: number;
		totalPages: number;
		filter?: string;
	};
}

export type EmployeesActionTypes =
	FetchEmployeesAction
	| AddEmployeesAction
	| GetCurrentPageAction;
