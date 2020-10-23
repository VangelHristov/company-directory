import { combineReducers } from 'redux';
import employeesReducer from './employeesReducers';
import errorsReducer from './errorsReducers';

export default combineReducers({
	employees: employeesReducer,
	errors: errorsReducer
});
