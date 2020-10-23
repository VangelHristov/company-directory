import { ListItemBackground } from './list-item-background.interface';
import { ListItemLabel } from './list-item-label.interface';

export const SAVE_LABEL = 'SAVE_LABEL';
export const SAVE_BACKGROUND = 'SAVE_BACKGROUND';


export interface SaveLabelAction {
	type: typeof SAVE_LABEL;
	payload: ListItemLabel;
}

export interface SaveBackgroundAction {
	type: typeof SAVE_BACKGROUND;
	payload: ListItemBackground;
}

export type ListItemAction = SaveBackgroundAction | SaveLabelAction;
