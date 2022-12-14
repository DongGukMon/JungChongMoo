import styled from '@emotion/native';
import {GestureResponderEvent} from 'react-native';
import {StylePropTypes} from '../../types/shared/emotion';
import {Row, SizedBox, SubTitle} from './Common';

interface RadioSelectorTypes {
  isSelected: boolean;
  name: string;
  onPress: (event: GestureResponderEvent) => void;
}

const BtnContainer = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
`;

const Radio = styled.View`
  width: 35px;
  height: 35px;
  border-width: 2px;
  border-radius: 25px;
  border-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.accent};
  justify-content: center;
  align-items: center;
`;

const InnerRadio = styled.View`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
  background-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.accent};
`;

const RadioSelector = ({isSelected, name, onPress}: RadioSelectorTypes) => {
  return (
    <BtnContainer onPress={onPress}>
      <Row style={{alignItems: 'center'}}>
        <Radio>{isSelected && <InnerRadio />}</Radio>
        <SizedBox width={10} />
        <SubTitle fontSize={18}>{name}</SubTitle>
      </Row>
    </BtnContainer>
  );
};

export default RadioSelector;
