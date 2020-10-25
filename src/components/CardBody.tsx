import React from 'react';
import styled from 'styled-components';
import { Employee } from '../interfaces/employee.interface';
import BackgroundSelect from './BackgroundSelect';

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
  position: relative;
  padding: 0px 20px;
`;

const CardHeader = styled.h1`
  font-size: 1.2em;
  margin: 0;
`;

const CardSubHeader = styled.h2`
  font-size: 1em;
  color: #009688;
  font-style: italic;
  margin: 0;
`;

const CardText = styled.p`
  padding: 10px 0px;
  color: #5A5A5A;
  line-height: 1.2;
  font-style: initial;
  margin: 0;
`;

type Props = { employee: Employee, handleColorChange: React.EventHandler<React.ChangeEvent<{ value: unknown }>> };

const CardBody = (props: Readonly<Props>) => {
	return (
		<CardContent>
			<div className='flex flex-justify-space-between w-100 flex-align-center'>
				<CardHeader>{props.employee.name}</CardHeader>
				<BackgroundSelect
					id={props.employee.uuid}
					selected={props.employee.background}
					handleColorChange={props.handleColorChange}
				/>
			</div>
			<CardSubHeader>{props.employee.company}</CardSubHeader>
			<CardText>{props.employee.bio}</CardText>
		</CardContent>
	);
};

export default CardBody;
