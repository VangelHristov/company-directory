import React from 'react';
import { Employee } from '../interfaces/employee.interface';
import { ImageInterface } from '../interfaces/image.interface';
import Card from './Card';
import EmptyList from './EmptyList';
import Overlay from './Overlay';

class EmployeesList extends React.Component<{ employees: Employee[] }, { image: ImageInterface }> {
	state = {
		image: {
			zoom: false,
			src: '',
			alt: ''
		}
	};

	constructor(props: { readonly employees: Employee[] }) {
		super(props);
		this.imageClicked = this.imageClicked.bind(this);
	}

	imageClicked(something: any): void {
		console.log(something);
		// this.setState({...this.state, image: {zoom: true, alt, src}});
	}

	render() {
		if (this.props.employees.length > 0) {
			return (
				<div>
					{this.props.employees.map((employee: Employee, id: number) =>
						<Card
							key={id}
							employee={employee}
							onClick={this.imageClicked}
						/>)}

					< Overlay
						src={this.state.image.src}
						alt={this.state.image.alt}
						visible={this.state.image.zoom}
					/>
				</div>
			);
		} else {
			return <EmptyList/>;
		}
	}
}

export default EmployeesList;
