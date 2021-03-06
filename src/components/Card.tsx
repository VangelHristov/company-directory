import React, { ChangeEvent, memo, MouseEventHandler } from 'react';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import styled from 'styled-components';
import { Employee } from '../interfaces/employee.interface';
import { EmployeesService } from '../services/employees.service';
import CardBody from './CardBody';
import CardFooter from './CardFooter';
import CardImage from './CardImage';

const Wrapper = memo(styled.div<{ readonly background: string }>`
  font-family: 'Open Sans', sans-serif;
  width: 800px;
  height: 200px;
  padding: 20px;
  border-radius: 3px;
  background-color: ${props => props.background};
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  margin-top: 40px;
  z-index: 2;
  display: flex;
`);

type Props = { employee: Employee, imageClicked: MouseEventHandler<HTMLImageElement> };

class Card extends React.Component<Props, { employee: Employee }> {
	private labelChange$ = new Subject<string>();
	private dispose$ = new Subject<void>();

	constructor(props: Readonly<Props>) {
		super(props);

		this.handleColorChange = this.handleColorChange.bind(this);
		this.handleLabelChange = this.handleLabelChange.bind(this);

		this.state = {
			employee: props.employee
		};

		this.labelChange$
			.pipe(
				distinctUntilChanged(),
				debounceTime(1000),
				takeUntil(this.dispose$)
			)
			.subscribe((label: string) => {
				EmployeesService.updateLabel(label, this.props.employee.uuid);
				this.setState({employee: {...this.state.employee, label}});
			});
	}

	static getDerivedStateFromProps(nextProps: Readonly<Props>) {
		return {employee: nextProps.employee};
	}

	handleColorChange(event: ChangeEvent<{ value: unknown }>) {
		event.stopPropagation();
		const background = event.target.value as string;
		EmployeesService.updateBackground(background, this.props.employee.uuid);
		this.setState({employee: {...this.state.employee, background}});
	}

	handleLabelChange(event: ChangeEvent<HTMLInputElement>): void {
		event.stopPropagation();
		this.labelChange$.next(event.target.value);
	}

	render(): JSX.Element {
		return (
			<Wrapper background={this.state.employee.background}>
				<CardImage
					src={this.state.employee.avatar}
					alt={this.state.employee.name}
					imageClicked={this.props.imageClicked}
				/>
				<article>
					<CardBody
						employee={this.state.employee}
						handleColorChange={this.handleColorChange}
					/>
					<CardFooter
						label={this.state.employee.label}
						handleLabelChange={this.handleLabelChange}
					/>
				</article>
			</Wrapper>
		);
	}
}

export default Card;
