import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPage } from '../actions/employees/actions';
import { Employee } from '../actions/employees/types';
import { RootState } from '../store';
import Card from './Card';
import FlexContainer from './FlexContainer';

class EmployeesList extends React.Component<any> {
	private pageSize = 20;
	private pageNumber = 0;
	private filter: string | null = null;

	constructor(props: any) {
		super(props);
		this.getNextPage = this.getNextPage.bind(this);
	}

	getNextPage(): void {
		this.pageNumber++;

		this.props.getPage({
			page: this.pageNumber,
			size: this.pageSize,
			filter: this.filter
		});
	}

	render() {
		const data = this.props.currentPage.data ?? [];
		return (
			<FlexContainer>
				{data.map((employee: Employee, id: number) => <Card key={id} employee={employee}/>)}
				<button onClick={this.getNextPage}>Get Next Page</button>
			</FlexContainer>
		);
	}
}

const mapStateToProps = (state: RootState) => state.employees;
const mapDispatchToProps = (dispatch: any) => bindActionCreators({getPage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
