import styled from 'styled-components';

const ExpandButton = styled.img.attrs(() => ({
	src: '/public/expand.svg',
	alt: 'expand button'
}))`
  height: 80px;
  width: 80px;
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
`;

export default ExpandButton;
