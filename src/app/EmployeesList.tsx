import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Employee } from '../actions/employees/employee.interface';
import { EmployeesState } from '../actions/employees/types';
import { RootState } from '../store';
import Card from './Card';

const mapStateToProps = (state: RootState) => {
	return state.employees;
};

const CardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
`;

class EmployeesList extends React.Component<EmployeesState> {
	constructor(props: Readonly<EmployeesState>) {
		super(props);
	}

	render() {
		return (
			<CardWrapper>
				{this.props.employees.map((empl: Employee) => {
					return <Card key={empl.uuid} employee={empl}/>;
				})}
			</CardWrapper>
		);
	}
}

export default connect(mapStateToProps)(EmployeesList);
