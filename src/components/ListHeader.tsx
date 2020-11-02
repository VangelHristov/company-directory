import { TextField } from '@material-ui/core';
import React, { ChangeEventHandler, memo } from 'react';
import styled from 'styled-components';

const Header = styled.header`
	width: 840px;
	display: flex;
	justify-content: space-between;
`;

type Props = { setFilter: ChangeEventHandler<HTMLInputElement> };

const ListHeader = (props: Props): JSX.Element => {
	return (
		<Header>
			<TextField
				id="search"
				label="Search by label"
				type="search"
				onChange={props.setFilter}/>
		</Header>
	);
};

export default memo(ListHeader);
