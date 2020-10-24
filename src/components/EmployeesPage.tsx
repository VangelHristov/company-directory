import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil, throttleTime } from 'rxjs/operators';
import { Employee } from '../interfaces/employee.interface';
import { PageOptions } from '../interfaces/page-options.interface';
import { PagedData } from '../interfaces/paged-data.interface';
import { EmployeesService } from '../services/employees.service';
import Card from './Card';
import FlexContainer from './FlexContainer';
import ListHeader from './ListHeader';

class EmployeesPage extends React.Component<{}, PagedData<Employee>> {

	state = {
		data: [],
		page: {
			number: 0,
			size: 20,
			filter: '',
			totalElements: 0,
			totalPages: 0
		}
	};

	private page$ = new Subject<PageOptions>();
	private filter$ = new Subject<string>();
	private dispose$ = new Subject<void>();
	private employeesService: EmployeesService = new EmployeesService();

	constructor(props: {} = {}) {
		super(props);
		this.getNextPage = this.getNextPage.bind(this);
		this.setFilter = this.setFilter.bind(this);

		this.page$
			.pipe(
				switchMap((options: PageOptions) =>
					this.employeesService.getEmployees$(options).pipe(catchError(() => EMPTY))),
				takeUntil(this.dispose$)
			)
			.subscribe((response: PagedData<Employee>) => this.setState(response));

		this.filter$
			.pipe(
				debounceTime(1000),
				takeUntil(this.dispose$)
			)
			.subscribe((value: string) => this.getNextPage(null, 1, value));
	}

	componentDidMount(): void {
		this.page$.next(this.state.page);
	}

	componentWillUnmount(): void {
		this.dispose$.next();
		this.dispose$.complete();
	}

	getNextPage(event: unknown, pageNumber: number, filter: string = ''): void {
		this.page$.next({
			size: this.state.page.size,
			number: pageNumber - 1,
			filter
		});
	}

	setFilter(event: any): void {
		this.filter$.next(event.target.value);
	}

	render() {
		return (
			<FlexContainer>
				<ListHeader setFilter={this.setFilter}/>
				{this.state.data.map((employee: Employee, id: number) => <Card key={id} employee={employee}/>)}
				<Pagination
					className="mt-40 mb-40"
					count={this.state.page.totalPages}
					variant='outlined'
					shape='rounded'
					size='large'
					onChange={this.getNextPage}/>
			</FlexContainer>
		);
	}
}

export default EmployeesPage;
