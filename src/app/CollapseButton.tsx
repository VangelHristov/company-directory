import styled from 'styled-components';

const CollapseButton = styled.img.attrs(() => ({
	src: '/public/collapsing-symbol.svg',
	alt: 'collapsing symbol'
}))`
    height: 80px;
    width: 80px;
	position: absolute;
	top: 0;
	left: 0;
	transform: translate(50%, 50%);
`;

export default CollapseButton;
