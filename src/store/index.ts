import { combineReducers } from 'redux';
import employeesReducer from '../reducers/employeesReducers';

const rootReducer = combineReducers({
	employees: employeesReducer
});

export type RootState = ReturnType<typeof rootReducer>
