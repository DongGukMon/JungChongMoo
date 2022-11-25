import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import {TitleText} from '../shared/Common';

const {width} = Dimensions.get('screen');

const AdContainer = styled.View`
  width: 90%;
  height: 200px;
  border-color: ${props => props.theme.colors.text};
  border-width: 2px;
  align-self: center;

  justify-content: center;
  align-items: center;
`;

const AdCarousel = () => {
  return (
    <AdContainer>
      <TitleText fontSize={24}>광고</TitleText>
    </AdContainer>
  );
};

export default AdCarousel;
