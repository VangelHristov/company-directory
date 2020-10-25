import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
	min-width: 120px;
	min-height: 180px;
	word-break: break-word;
	& img {
	  border-radius: 50%;
	  width: 120px;
	  height: 120px;
	  margin-left: auto;
	  margin-right: auto;
    }
`;

const CardImage = (props: Readonly<{ src: string, alt: string }>) => {
	const onError = (errorEvent: any) => errorEvent.nativeEvent.target.src = '/default-avatar.png';
	return (<ImageWrapper><img src={props.src} alt={props.alt} onError={onError}/></ImageWrapper>);
};
export default CardImage;
