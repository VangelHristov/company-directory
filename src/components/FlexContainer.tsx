import { memo } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	min-height: 100vh;
`;

export default memo(FlexContainer);
