import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ADD_ERROR, ErrorAction } from '../errors/types';
import { ADD_EMPLOYEES, Employee, EmployeesActionTypes, GET_CURRENT_PAGE, PageOptions } from './types';

const apiUrl = 'https://hiring.rewardgateway.net/list';
const requestOptions = {
	auth: {
		username: 'medium',
		password: 'medium'
	}
};

export const fetchEmployees = () => {
	return (dispatch: Dispatch<EmployeesActionTypes | ErrorAction>) => {
		return axios.get(apiUrl, requestOptions)
			.then((response: AxiosResponse<Employee[]>) => dispatch({
					type: ADD_EMPLOYEES,
					payload: response.data
				})
			)
			.then(() => dispatch({
				type: GET_CURRENT_PAGE,
				payload: {
					page: 0,
					size: 20,
					filter: null
				}
			}))
			.catch((error) => {
				dispatch({
					type: ADD_ERROR,
					payload: error
				});
			});
	};
};

export const getPage = (payload: PageOptions) => {
	return {
		type: GET_CURRENT_PAGE,
		payload
	};
};
