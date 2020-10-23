import axios, { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';
import { ADD_ERROR, ErrorAction } from '../errors/types';
import { Employee } from './employee.interface';
import { ADD_EMPLOYEES, EmployeesActionTypes } from './types';

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
			.catch((error) => {
				dispatch({
					type: ADD_ERROR,
					payload: error
				});
			});
	};
};
