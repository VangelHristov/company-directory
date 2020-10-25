import { ListItem } from '../interfaces/list-item.interface';

export class StorageService {
	private static storage = window.localStorage;
	private static itemsKey = 'ListItems';

	public static saveBackground(background: string, itemId: string): void {
		const items: StorageListItems = StorageService.getListItems(StorageService.itemsKey);
		const item: ListItem = items[itemId] as ListItem ?? {};

		item.background = background;
		items[itemId] = item;

		StorageService.setObject(items, StorageService.itemsKey);
	}

	public static saveLabel(label: string, itemId: string): void {
		const items: StorageListItems = StorageService.getListItems(StorageService.itemsKey);
		const item: ListItem = items[itemId] as ListItem ?? {};

		item.label = label;
		items[itemId] = item;

		StorageService.setObject(items, StorageService.itemsKey);
	}

	public static getStorageItems(): StorageListItems {
		return StorageService.getListItems(StorageService.itemsKey);
	}

	private static setObject(obj: StorageListItems, key: string): void {
		StorageService.storage.setItem(key, JSON.stringify(obj));
	}

	private static getListItems(key: string): StorageListItems {
		const item = StorageService.storage.getItem(key);

		if (item === null) {
			return {};
		}

		return JSON.parse(item);
	}
}

export type StorageListItems = { [key: string]: ListItem };
