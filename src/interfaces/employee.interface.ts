import { ListItem } from './list-item.interface';

export interface Employee extends ListItem {
	uuid: string;
	company: string;
	bio: string;
	name: string;
	title: string;
	avatar: string;
}
