import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { Employee, EmployeeLabel, ListItemBackground, PagingOptions } from './interfaces';
import { ADD_EMPLOYEES, SAVE_BACKGROUND } from './types';

axiosRetry(axios, { retries: 3 });

const apiUrl = 'http://hiring.rewardgateway.net/list';
const headers = {
	accept: 'application/json',
	auth: {
		username: 'medium',
		password: 'medium'
	}
};

export const saveBackground = (payload: ListItemBackground) => {
	return {
		type: SAVE_BACKGROUND,
		payload: {
			uuid: payload.uuid,
			color: payload.color
		}
	};
};

export const getEmployees = (payload: PagingOptions) => {
	return {
		type: SAVE_BACKGROUND,
		payload: {
			page: payload.page,
			size: payload.size,
			filter: payload.filter
		}
	};
};

export const saveLabel = (payload: EmployeeLabel) => {
	return {
		type: SAVE_BACKGROUND,
		payload: {
			uuid: payload.uuid,
			text: payload.text
		}
	};
};

export const fetchEmployees = (): any => {
	// Add proper type
	return (next: any) => {
		return axios.get(apiUrl, headers)
			.then((response: AxiosResponse<Employee[]>) => {
				console.log(response);
				return response.data;
			})
			.then((employees: Employee[]) => {
				next({
					type: ADD_EMPLOYEES,
					payload: employees
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
};
