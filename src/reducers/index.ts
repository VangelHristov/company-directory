import { combineReducers } from 'redux';
import employeesReducer from './employeesReducers';

export default combineReducers({
	employees: employeesReducer
});
