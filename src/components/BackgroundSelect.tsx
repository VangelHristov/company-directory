import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, EventHandler, memo, useState } from 'react';

type Props = { selected: string, id: string, handleColorChange: EventHandler<ChangeEvent<{ value: unknown }>> };
type Color = { value: string; label: string };

const BackgroundSelect = (props: Props): JSX.Element => {
	const [state]: [Color[], any] = useState([
		{value: '#ffffff', label: 'White'},
		{value: '#90ee90', label: 'Green'},
		{value: '#ffb6c1', label: 'Pink'},
		{value: '#dcdcdc', label: 'Grey'},
		{value: '#00ffff', label: 'Cyan'}
	]);

	return (
		<FormControl classes={{root: 'w-25'}}>
			<InputLabel id={'label' + props.id}>Background</InputLabel>
			<Select
				labelId={'label' + props.id}
				id={props.id}
				value={props.selected}
				onChange={props.handleColorChange}
			>
				{state.map((option: Color, key: number) =>
					<MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
			</Select>
		</FormControl>
	);
};

export default memo(BackgroundSelect);
