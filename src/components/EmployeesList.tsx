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
		this.zoomIn = this.zoomIn.bind(this);
		this.zoomOut = this.zoomOut.bind(this);
	}

	zoomIn(event: React.MouseEvent<HTMLImageElement, any>): void {
		const target = event.nativeEvent.target;
		this.setState({image: {zoom: true, src: target.src, alt: target.alt}});
	}

	zoomOut(): void {
		this.setState({image: {zoom: false, src: '', alt: ''}});
	}

	render() {
		if (this.props.employees.length > 0) {
			return (
				<div>
					{this.props.employees.map((employee: Employee, id: number) =>
						<Card
							key={id}
							employee={employee}
							imageClicked={this.zoomIn}
						/>)}

					< Overlay
						onClick={this.zoomOut}
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
