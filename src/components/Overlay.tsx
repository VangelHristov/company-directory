import React from 'react';
import styled from 'styled-components';

const OverlayDiv = styled.div<{ readonly visible: boolean } & {}>`
	display: ${props => props.visible ? 'flex' : 'none'};
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: fixed;
	width: 100vw
 	height: 100wh;
 	top: 0;
	left: 0;
	right: 0;
 	bottom: 0;
	background-color: rgba(0,0,0,0.85);
	z-index: 2;
	cursor: pointer;
	& img {
		width: 50%;
		height: auto;
	}
`;

type Props = { src: string, alt: string, visible: boolean, onClick: React.MouseEventHandler<HTMLDivElement> };

const Overlay = (props: Readonly<Props>) => {
	return (
		<OverlayDiv visible={props.visible} onClick={props.onClick}>
			<img src={props.src} alt={props.alt}/>
		</OverlayDiv>
	);
};

export default Overlay;
