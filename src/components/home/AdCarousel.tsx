import styled from '@emotion/native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const AdContainer = styled.View`
  width: 90%;
  height: 200px;
  border-color: ${props => props.theme.colors.text};
  border-width: 2px;
  align-self: center;
`;

const AdCarousel = () => {
  return <AdContainer></AdContainer>;
};

export default AdCarousel;
