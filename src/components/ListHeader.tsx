import { TextField } from '@material-ui/core';
import React, { ChangeEventHandler } from 'react';
import styled from 'styled-components';

const Header = styled.header`
	width: 840px;
	display: flex;
	justify-content: space-between;
`;

type Props = {setFilter: ChangeEventHandler<HTMLInputElement>};

class ListHeader extends React.Component<Props> {
	render(): JSX.Element {
		return (
			<Header>
				<TextField
					id="search"
					label="Search by label"
					type="search"
					onChange={this.props.setFilter}/>
			</Header>
		);
	}
}

export default ListHeader;
