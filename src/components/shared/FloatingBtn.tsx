import styled from '@emotion/native';
import {Dimensions, GestureResponderEvent} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {lightTheme} from '../../styles/theme';
import {StylePropTypes} from '../../types/shared/emotion';
import {Button, ButtonText} from './Common';

interface MainButtonProps {
  onPress: (event: GestureResponderEvent) => void;
}

const {width} = Dimensions.get('screen');

const ButtonContainer = styled.View`
  height: 100px;
  width: 100%;
  align-self: center;
`;

const SFloatingButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 56px;
  right: 26px;
  justify-content: center;
  align-items: center;
`;
const WhiteBack = styled.View`
  position: absolute;
  background-color: ${props => props.theme.colors.main};
  align-self: center;
  width: 37px;
  height: 37px;
`;

const FloatingButton = ({onPress}: MainButtonProps) => {
  return (
    <SFloatingButton onPress={onPress}>
      <WhiteBack />
      <Icon name="add-circle" size={70} color={lightTheme.colors.accent} />
    </SFloatingButton>
  );
};

export default FloatingButton;
