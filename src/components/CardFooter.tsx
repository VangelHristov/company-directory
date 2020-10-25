import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, EventHandler } from 'react';

type Props = { label: string, handleLabelChange: EventHandler<ChangeEvent<HTMLInputElement>> };

const CardFooter = (props: Readonly<Props>): JSX.Element => {
	return (
		<TextField
			classes={{root: 'ml-20'}}
			label="Label"
			onChange={props.handleLabelChange}
			defaultValue={props.label}
		/>
	);
};

export default CardFooter;
