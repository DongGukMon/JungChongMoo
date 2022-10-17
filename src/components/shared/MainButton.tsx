import styled from '@emotion/native';
import {Dimensions, GestureResponderEvent} from 'react-native';
import {StylePropTypes} from '../../types/shared/emotion';
import {Button, ButtonText} from './Common';

interface MainButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const {width} = Dimensions.get('screen');

const ButtonContainer = styled.View`
  height: 100px;
  width: 100%;

  /* background-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.main}; */

  align-self: center;
`;

const SMainButton = styled(Button)`
  position: absolute;
  bottom: 56px;
  align-self: center;
  width: ${`${width - 52}px`};
  top: 10px;
  opacity: ${(props: {disabled: boolean}) => (props.disabled ? '0.6' : '1')};
`;

const MainButton = ({text, onPress, disabled = false}: MainButtonProps) => {
  return (
    <ButtonContainer>
      <SMainButton disabled={disabled} onPress={onPress}>
        <ButtonText>{text}</ButtonText>
      </SMainButton>
    </ButtonContainer>
  );
};

export default MainButton;
