import React from 'react';
import styled from 'styled-components';
import { Employee } from '../actions/employees/types';

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

const CardBody = (props: Readonly<{ employee: Employee }>) => {
	return (
		<CardContent>
			<CardHeader>{props.employee.name}</CardHeader>
			<CardSubHeader>{props.employee.title} at {props.employee.company}</CardSubHeader>
			<CardText>{props.employee.bio}</CardText>
		</CardContent>
	);
};

export default CardBody;
