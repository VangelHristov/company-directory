export interface ListItemBackground {
	uuid: string;
	color: string;
}

export interface PagingOptions {
	size: number;
	page: number;
	filter: string;
}

export interface EmployeeLabel {
	uuid: string;
	text: string;
}

export interface Employee {
	uuid: string;
	company: string;
	bio: string;
	name: string;
	title: string;
	avatar: string;
}
