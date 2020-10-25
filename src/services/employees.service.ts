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
	private static employees: Employee[] = [];
	private static readonly apiUrl = 'https://hiring.rewardgateway.net/list';
	private static readonly auth = {username: 'medium', password: 'medium'};

	public static getEmployees$(page: PageOptions): Observable<PagedData<Employee>> {
		if (EmployeesService.employees.length > 0) {
			return of(EmployeesService.getPage(page.number, page.size, page.filter));
		}

		return fromPromise(axios.get(EmployeesService.apiUrl, {auth: EmployeesService.auth}))
			.pipe(
				tap((response: AxiosResponse<Employee[]>) => this.employees = response.data),
				map(() => EmployeesService.getPage(page.number, page.size, page.filter)),
				take(1)
			);
	}

	public static updateBackground(background: string, employeeId: string): void {
		StorageService.saveBackground(background, employeeId);
		const employeeToBeUpdated = EmployeesService.employees.find(employee => employee.uuid === employeeId);
		if (employeeToBeUpdated !== undefined) {
			employeeToBeUpdated.background = background;
		}
	}

	public static updateLabel(label: string, employeeId: string): void {
		StorageService.saveLabel(label, employeeId);
		const employeeToBeUpdated = EmployeesService.employees.find(employee => employee.uuid === employeeId);
		if (employeeToBeUpdated !== undefined) {
			employeeToBeUpdated.label = label;
		}
	}

	private static getPage(pageNumber: number, size: number, filter: string): PagedData<Employee> {
		let totalElements = EmployeesService.employees.length;
		let totalPages = (totalElements > 0 && size > 0) ? Math.ceil(totalElements / size) : 0;

		if (pageNumber > totalPages || pageNumber < 0) {
			return {
				data: [],
				page: {size, number: pageNumber, totalElements, totalPages, filter}
			};
		}

		const startIndex = pageNumber * size;
		const endIndex = startIndex + size > totalElements ? totalElements : startIndex + size;

		let employees = EmployeesService.employees.slice();
		if (filter) {
			employees = employees.filter((employee: Employee) => EmployeesService.isMatch(employee.label, filter));
		}

		totalElements = employees.length;
		totalPages = (totalElements > 0 && size > 0) ? Math.ceil(totalElements / size) : 0;

		const storageItems = StorageService.getStorageItems();
		employees = EmployeesService.mapLabelsAndBackground(employees.slice(startIndex, endIndex), storageItems);

		return {
			data: employees,
			page: {size, number: pageNumber, totalElements, totalPages, filter}
		};
	}

	private static mapLabelsAndBackground(employees: Employee[], storageItems: StorageListItems): Employee[] {
		return employees.map(employee => {
			const item: ListItem = storageItems[employee.uuid] ?? {background: '#ffffff', label: ''};
			employee.background = item.background;
			employee.label = item.label;

			return employee;
		});
	}

	private static isMatch(source: string, searchedValue: string): boolean {
		if (!source || !searchedValue) {
			return false;
		}

		return source.toUpperCase().includes(searchedValue.toUpperCase());
	};
}
