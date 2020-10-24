import React from 'react';
import styled from 'styled-components';
import { Employee } from '../interfaces/employee.interface';
import CardBody from './CardBody';
import CardImage from './CardImage';


const Card = styled.div`
  font-family: 'Open Sans', sans-serif;
  width: 800px;
  height: 120px;
  padding: 20px;
  border-radius: 3px;
  background-color: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  margin-top: 40px;
  z-index: 2;
  position: relative;
  display: flex;
`;

export default (props: Readonly<{ employee: Employee }>) => {
	return (
		<Card className='card'>
			<CardImage src={props.employee.avatar} alt={props.employee.name}/>
			<CardBody employee={props.employee}/>
		</Card>
	);
}
