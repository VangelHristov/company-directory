import React, { PropsWithChildren } from 'react';
import { connect } from 'react-redux';
import { Employee } from '../actions/employees/employee.interface';
import { EmployeesState } from '../actions/employees/types';
import { RootState } from '../store';

const mapStateToProps = (state: RootState) => {
	return state.employees;
};

class EmployeesList extends React.Component<EmployeesState> {
	constructor(props: Readonly<EmployeesState>) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.employees.slice(0, 5).map((empl: Employee) => {
					return <div key={empl.uuid}>{empl.name}</div>;
				})}
			</div>
		);
	}
}

export default connect(mapStateToProps)(EmployeesList);
