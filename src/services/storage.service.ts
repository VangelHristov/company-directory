import { ListItem } from '../interfaces/list-item.interface';

export class StorageService {
	private storage = window.localStorage;
	private itemsKey = 'ListItems';

	saveBackground(background: string, itemId: string): void {
		const items: StorageListItems = this.getListItems(this.itemsKey);
		const item: ListItem = items[itemId] as ListItem ?? {};

		item.background = background;
		items[itemId] = item;

		this.setObject(items, this.itemsKey);
	}

	saveLabel(label: string, itemId: string): void {
		const items: StorageListItems = this.getListItems(this.itemsKey);
		const item: ListItem = items[itemId] as ListItem ?? {};

		item.label = label;
		items[itemId] = item;

		this.setObject(items, this.itemsKey);
	}

	getStorageItems(): StorageListItems {
		return this.getListItems(this.itemsKey);
	}

	private setObject(obj: StorageListItems, key: string): void {
		this.storage.setItem(key, JSON.stringify(obj));
	}

	private getListItems(key: string): StorageListItems {
		const item = this.storage.getItem(key);

		if (item === null) {
			return {};
		}

		return JSON.parse(item);
	}
}

export type StorageListItems = { [key: string]: ListItem };
