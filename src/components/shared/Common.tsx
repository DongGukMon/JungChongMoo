import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import {stylePropTypes} from '../../types/shared/emotion';

const {width} = Dimensions.get('screen');

export const ScreenContainer = styled.ScrollView`
  background-color: ${(props: Pick<stylePropTypes, 'theme'>) =>
    props.theme.colors.main};
  flex: 1;
`;

export const TitleText = styled.Text`
  color: ${(props: Pick<stylePropTypes, 'theme'>) => props.theme.colors.text};
  font-size: ${(props: Pick<stylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: bold;
`;

export const SizedBox = styled.View`
  height: ${(props: Pick<stylePropTypes, 'height'>) => props.height}px;
`;

export const Padding = styled.View`
  padding: ${(props: Pick<stylePropTypes, 'padding'>) => props.padding}px;
`;

export const Card = styled.TouchableOpacity`
  height: ${(props: Pick<stylePropTypes, 'height'>) => `${props.height}px`};
  width: 100%;
  border-radius: 10px;
  background-color: ${(props: Pick<stylePropTypes, 'theme'>) =>
    props.theme.colors.box};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${(props: Pick<stylePropTypes, 'theme'>) =>
    props.theme.colors.accent};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const MainButton = styled(Button)`
  position: absolute;
  bottom: 56px;
  align-self: center;
  width: ${`${width - 52}px`};
`;

export const ButtonText = styled.Text`
  color: ${(props: Pick<stylePropTypes, 'theme'>) => props.theme.colors.main};
  font-size: 18px;
  font-weight: bold;
`;

export const Box = styled.View`
  height: ${(props: Pick<stylePropTypes, 'height'>) => `${props.height}px`};
  width: 100%;

  background-color: ${(props: Pick<stylePropTypes, 'theme'>) =>
    props.theme.colors.box};
`;

export const SubTitle = styled.Text`
  color: ${(props: Pick<stylePropTypes, 'theme'>) => props.theme.colors.text};
  font-size: ${(props: Pick<stylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: 600;
`;

export const Description = styled.Text`
  color: ${(props: Pick<stylePropTypes, 'theme'>) =>
    props.theme.colors.lightText};
  font-size: ${(props: Pick<stylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: 600;
`;

export const Row = styled.Text`
  flex-direction: row;
  width: 100%;
  flex: 1;
`;
