import { ListItemBackground } from './list-item-background.interface';
import { ListItemLabel } from './list-item-label.interface';
import { SAVE_BACKGROUND, SAVE_LABEL } from './types';

export const saveBackground = (payload: ListItemBackground) => {
	return {
		type: SAVE_BACKGROUND,
		payload: {
			uuid: payload.uuid,
			color: payload.color
		}
	};
};


export const saveLabel = (payload: ListItemLabel) => {
	return {
		type: SAVE_LABEL,
		payload: {
			uuid: payload.uuid,
			text: payload.text
		}
	};
};
