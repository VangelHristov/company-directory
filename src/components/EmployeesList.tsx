import React from 'react';
import { Employee } from '../interfaces/employee.interface';
import Card from './Card';

class EmployeesList extends React.Component<{ employees: Employee[] }> {
	render() {
		return (
			this.props.employees.map((employee: Employee, id: number) => <Card key={id} employee={employee}/>)
		);
	}
}

export default EmployeesList;
