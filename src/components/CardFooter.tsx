import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent, EventHandler } from 'react';

type Props = { label: string, handleLabelChange: EventHandler<ChangeEvent<HTMLInputElement>> };

const CardFooter = (props: Readonly<Props>) => {
	return (
		<div className='ml-20'>
			<TextField
				label="Label"
				onChange={props.handleLabelChange}
				defaultValue={props.label}
			/>
		</div>
	);
};

export default CardFooter;
