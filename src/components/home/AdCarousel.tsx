import styled from '@emotion/native';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('screen');

const AdContainer = styled.View`
  width: ${width}px;
  height: 200px;
  background-color: green;
`;

const AdCarousel = () => {
  return <AdContainer></AdContainer>;
};

export default AdCarousel;
