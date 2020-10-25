import React from 'react';
import styled from 'styled-components';

const OverlayDiv = styled.div<{ readonly visible: boolean }>`
	display: ${props => props.visible ? 'block' : 'none'};
	position: fixed;
	width: 100%;
 	height: 100%;
 	top: 0;
	left: 0;
	right: 0;
 	bottom: 0;
	background-color: rgba(0,0,0,0.7);
	z-index: 2;
	cursor: pointer;
	& img {
		width: 100%;
		height: 100%;
	}
`;

const Overlay = (props: { src: string, alt: string, visible: boolean }) => {
	return (
		<OverlayDiv visible={props.visible}>
			<img src={props.src} alt={props.alt}/>
		</OverlayDiv>
	);
};

export default Overlay;
