import axios, { AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { Observable, of } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import { map, take, tap } from 'rxjs/operators';
import { Employee } from '../interfaces/employee.interface';
import { ListItem } from '../interfaces/list-item.interface';
import { PageOptions } from '../interfaces/page-options.interface';
import { PagedData } from '../interfaces/paged-data.interface';
import { StorageListItems, StorageService } from './storage.service';

axiosRetry(axios, {retries: 5});

export class EmployeesService {
	private employees: Employee[] = [];
	private storageService = new StorageService();
	private readonly apiUrl = 'https://hiring.rewardgateway.net/list';
	private readonly auth = {username: 'medium', password: 'medium'};

	private static isMatch(source: string, searchedValue: string): boolean {
		if (!source || !searchedValue) {
			return false;
		}

		return source.toUpperCase().includes(searchedValue.toUpperCase());
	};

	getEmployees$(page: PageOptions): Observable<PagedData<Employee>> {
		if (this.employees.length > 0) {
			return of(this.getPage(page.number, page.size, page.filter));
		}

		return fromPromise(axios.get(this.apiUrl, {auth: this.auth}))
			.pipe(
				tap((response: AxiosResponse<Employee[]>) => this.employees = response.data),
				map(() => this.getPage(page.number, page.size, page.filter)),
				take(1)
			);
	}

	private getPage(pageNumber: number, size: number, filter: string): PagedData<Employee> {
		let totalElements = this.employees.length;
		let totalPages = (totalElements > 0 && size > 0) ? Math.ceil(totalElements / size) : 0;

		if (pageNumber > totalPages || pageNumber < 0) {
			return {
				data: [],
				page: {size, number: pageNumber, totalElements, totalPages, filter}
			};
		}

		const startIndex = pageNumber * size;
		const endIndex = startIndex + size > totalElements ? totalElements : startIndex + size;

		let employees = this.employees.slice();
		if (filter) {
			employees = employees.filter((employee: Employee) => EmployeesService.isMatch(employee.name, filter));
		}

		totalElements = employees.length;
		totalPages = (totalElements > 0 && size > 0) ? Math.ceil(totalElements / size) : 0;

		const storageItems = this.storageService.getStorageItems();
		employees = this.mapEmployees(employees.slice(startIndex, endIndex), storageItems);

		return {
			data: employees,
			page: {size, number: pageNumber, totalElements, totalPages, filter}
		};
	}

	private mapEmployees(employees: Employee[], storageItems: StorageListItems): Employee[] {
		return employees.map(employee => {
			const item: ListItem = storageItems[employee.uuid] ?? {background: '#ffffff', label: ''};
			employee.background = item.background;
			employee.label = item.label;

			return employee;
		});
	};
}
