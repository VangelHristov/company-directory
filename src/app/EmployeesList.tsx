import Pagination from '@material-ui/lab/Pagination';
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
	private filter: string | null = null;

	constructor(props: any) {
		super(props);
		this.getNextPage = this.getNextPage.bind(this);
	}

	getNextPage(event: unknown, pageNumber: number): void {
		this.props.getPage({
			page: pageNumber - 1,
			size: this.pageSize,
			filter: this.filter
		});
	}

	render() {
		const data = this.props.currentPage.data ?? [];
		return (
			<FlexContainer>
				{data.map((employee: Employee, id: number) => <Card key={id} employee={employee}/>)}
				{data.length > 0 ? <Pagination
					className="mt-40 mb-40"
					count={this.props.currentPage.page.totalPages}
					variant='outlined'
					shape='rounded'
					size='large'
					onChange={this.getNextPage}
				/> : null}
			</FlexContainer>
		);
	}
}

const mapStateToProps = (state: RootState) => state.employees;
const mapDispatchToProps = (dispatch: any) => bindActionCreators({getPage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesList);
