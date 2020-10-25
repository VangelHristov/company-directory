import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React, { ChangeEvent, EventHandler } from 'react';

type Props = { selected: string, id: string, handleColorChange: EventHandler<ChangeEvent<{ value: unknown }>> };
type Color = { value: string; label: string };
type State = { colorOptions: Color[] };

class BackgroundSelect extends React.Component<Props, State> {
	state: State = {
		colorOptions: [
			{value: '#ffffff', label: 'White'},
			{value: '#90ee90', label: 'Green'},
			{value: '#ffb6c1', label: 'Pink'},
			{value: '#dcdcdc', label: 'Grey'},
			{value: '#00ffff', label: 'Cyan'}
		]
	};

	render(): JSX.Element {
		return (
			<FormControl classes={{root: 'w-25'}}>
				<InputLabel id={'label' + this.props.id}>Background</InputLabel>
				<Select
					labelId={'label' + this.props.id}
					id={this.props.id}
					value={this.props.selected}
					onChange={this.props.handleColorChange}
				>
					{this.state.colorOptions.map((option, key) =>
						<MenuItem key={key} value={option.value}>{option.label}</MenuItem>)}
				</Select>
			</FormControl>
		);
	}
}

export default BackgroundSelect;
