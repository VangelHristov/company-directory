import React from 'react';
import styled from 'styled-components';
import { Employee } from '../actions/employees/employee.interface';


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
`;

const Info = styled.div`
  z-index: 2;
  position: relative;
  display: flex;
`;

const AvatarWrapper = styled.div`
	min-width: 120px;
	min-height: 180px;
	word-break: break-word;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  z-index: 2;
  position: relative;
  padding: 0px 20px;
`;

const EmployeeName = styled.h1`
  font-size: 1.2em;
  margin: 0;
`;

const EmployeeTitle = styled.h2`
  font-size: 1em;
  color: #009688;
  font-style: italic;
  margin: 0;
`;

const EmployeeBio = styled.p`
  padding: 10px 0px;
  color: #5A5A5A;
  line-height: 1.2;
  font-style: initial;
  margin: 0;
`;

export default (props: Readonly<{ employee: Employee }>) => {
	return (
		<Card className='card'>
			<Info>
				<AvatarWrapper>
					<Avatar src={props.employee.avatar} alt={props.employee.name}/>
				</AvatarWrapper>
				<Profile>
					<EmployeeName>{props.employee.name}</EmployeeName>
					<EmployeeTitle>{props.employee.title} at {props.employee.company}</EmployeeTitle>
					<EmployeeBio>{props.employee.bio}</EmployeeBio>
				</Profile>
			</Info>
		</Card>
	);
}
