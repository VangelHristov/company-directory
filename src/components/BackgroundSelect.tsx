import { FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import React from 'react';

type Props = { selected: string, id: string, handleColorChange: React.EventHandler<React.ChangeEvent<{ value: unknown }>> };
type Color = { value: string; label: string };
type State = { colorOptions: Color[] };

class BackgroundSelect extends React.Component<Props, State> {
	state = {
		colorOptions: [
			{value: '#ffffff', label: 'White'},
			{value: '#90ee90', label: 'Green'},
			{value: '#ffb6c1', label: 'Pink'},
			{value: '#dcdcdc', label: 'Grey'},
			{value: '#00ffff', label: 'Cyan'}
		]
	};

	render() {
		return (
			<div className='w-25'>
				<FormControl fullWidth={true}>
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
			</div>
		);
	}
}

export default BackgroundSelect;
