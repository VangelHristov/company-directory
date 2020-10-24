import { PageInfo } from './page-info.interface';

export interface PagedData<T> {
	data: T[];
	page: PageInfo;
}
