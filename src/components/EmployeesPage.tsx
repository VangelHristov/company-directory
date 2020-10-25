import { CircularProgress } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import Pagination from '@material-ui/lab/Pagination';
import React from 'react';
import { EMPTY, Subject } from 'rxjs';
import { catchError, debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { Employee } from '../interfaces/employee.interface';
import { PageOptions } from '../interfaces/page-options.interface';
import { PagedData } from '../interfaces/paged-data.interface';
import { EmployeesService } from '../services/employees.service';
import EmployeesList from './EmployeesList';
import FlexContainer from './FlexContainer';
import ListHeader from './ListHeader';

type State = PagedData<Employee> & { loading: boolean, showNotification: boolean };

class EmployeesPage extends React.Component<{}, State> {

	state: State = {
		data: [],
		page: {
			number: 0,
			size: 20,
			filter: '',
			totalElements: 0,
			totalPages: 0
		},
		loading: true,
		showNotification: false
	};

	private page$ = new Subject<PageOptions>();
	private filter$ = new Subject<string>();
	private dispose$ = new Subject<void>();

	constructor(props: Readonly<{}>) {
		super(props);

		this.getNextPage = this.getNextPage.bind(this);
		this.setFilter = this.setFilter.bind(this);

		this.page$
			.pipe(
				switchMap((options: PageOptions) =>
					EmployeesService.getEmployees$(options).pipe(catchError(() => {
						this.setState({...this.state, showNotification: true, loading: false});
						return EMPTY;
					}))),
				takeUntil(this.dispose$)
			)
			.subscribe((response: PagedData<Employee>) => {
				this.setState({loading: false, ...response});
				window.scrollTo({top: 0, behavior: 'smooth'});
			});

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

	getNextPage(event: unknown, pageNumber: number, filter: string = this.state.page.filter): void {
		this.page$.next({
			size: this.state.page.size,
			number: pageNumber - 1,
			filter
		});
	}

	setFilter(event: React.ChangeEvent<HTMLInputElement>): void {
		this.filter$.next(event.target.value);
	}

	render(): JSX.Element {
		return (
			<main>
				<FlexContainer className={this.state.loading ? 'mt-40' : 'hidden'}>
					<CircularProgress/>
					<span>Loading...</span>
				</FlexContainer>
				<FlexContainer className={this.state.loading ? 'hidden' : ''}>
					<ListHeader setFilter={this.setFilter}/>
					<EmployeesList employees={this.state.data}/>
					<Pagination
						className={'mt-40 mb-40 ' + (this.state.data.length < 1 ? 'hidden' : '')}
						count={this.state.page.totalPages}
						variant='outlined'
						shape='rounded'
						size='large'
						onChange={this.getNextPage}/>
				</FlexContainer>
				<Snackbar
					anchorOrigin={{vertical: 'top', horizontal: 'center'}}
					open={this.state.showNotification}
					message='An error occurred while fetching the data.'
					key='topcenter'
				/>
			</main>
		);
	}
}

export default EmployeesPage;
