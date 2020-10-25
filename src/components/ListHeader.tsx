import { TextField } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';

const Header = styled.header`
	width: 840px;
	display: flex;
	justify-content: space-between;
`;

type Props = {setFilter: React.ChangeEventHandler<HTMLInputElement>};

class ListHeader extends React.Component<Props> {
	render() {
		return (
			<Header>
				<TextField
					id="standard-search"
					label="Search by name"
					type="search"
					onChange={this.props.setFilter}/>
			</Header>
		);
	}
}

export default ListHeader;
