import React from 'react';
import styled from 'styled-components';
import { Employee } from '../interfaces/employee.interface';
import { StorageService } from '../services/storage.service';
import CardBody from './CardBody';
import CardImage from './CardImage';

const CardDiv = styled.div<{ readonly background: string }>`
  font-family: 'Open Sans', sans-serif;
  width: 800px;
  height: 120px;
  padding: 20px;
  border-radius: 3px;
  background-color: ${props => props.background};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  margin-top: 40px;
  z-index: 2;
  position: relative;
  display: flex;
`;

const storageService = new StorageService();

type Props = { employee: Employee, imageClicked: React.MouseEventHandler<any> };

class Card extends React.Component<Props, { employee: Employee }> {
	constructor(props: Readonly<Props>) {
		super(props);
		this.handleColorChange = this.handleColorChange.bind(this);
		this.state = {
			employee: props.employee
		};
	}

	componentWillReceiveProps(nextProps: Readonly<Props>) {
		this.setState({employee: nextProps.employee});
	}

	handleColorChange(event: React.ChangeEvent<{ value: unknown }>) {
		const background = event.target.value as string;
		storageService.saveBackground(background, this.props.employee.uuid);
		this.setState({employee: {...this.state.employee, background}});
	}

	render() {
		return (
			<CardDiv className='card' background={this.state.employee.background}>
				<CardImage
					src={this.state.employee.avatar}
					alt={this.state.employee.name}
					imageClicked={this.props.imageClicked}
				/>
				<CardBody
					employee={this.state.employee}
					handleColorChange={this.handleColorChange}
				/>
			</CardDiv>
		);
	}
}

export default Card;
