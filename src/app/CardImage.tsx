import React from 'react';
import styled from 'styled-components';

const ImageWrapper = styled.div`
	min-width: 120px;
	min-height: 180px;
	word-break: break-word;
`;

const Image = styled.img`
  border-radius: 50%;
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
`;

const CardImage = (props: Readonly<{ src: string, alt: string }>) => {
	return (<ImageWrapper><Image src={props.src} alt={props.alt}/></ImageWrapper>);
};
export default CardImage;
