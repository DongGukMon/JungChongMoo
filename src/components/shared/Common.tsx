import styled from '@emotion/native';
import {Dimensions} from 'react-native';
import {OptionThemeTypes, StylePropTypes} from '../../types/shared/emotion';

const {width} = Dimensions.get('screen');

export const TitleText = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${(props: Pick<StylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: bold;
`;

export const SizedBox = styled.View`
  height: ${(props: Pick<StylePropTypes, 'height' | 'width'>) =>
    props.height || 0}px;
  width: ${(props: Pick<StylePropTypes, 'width' | 'height'>) =>
    props.width || 0}px;
`;

export const Padding = styled.View`
  padding: ${(props: Pick<StylePropTypes, 'padding'>) => props.padding}px;
`;

export const Card = styled.TouchableOpacity`
  height: ${(props: Pick<StylePropTypes, 'height'>) =>
    props.height ? `${props.height}px` : 'auto'};
  width: 100%;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.box};
  margin-bottom: 26px;
`;

export const ViewCard = styled.View`
  height: ${(props: Pick<StylePropTypes, 'height'>) =>
    props.height ? `${props.height}px` : 'auto'};
  width: 100%;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.box};
  margin-bottom: 26px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  background-color: ${props => props.theme.colors.accent};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${props => props.theme.colors.main};
  font-size: 18px;
  font-weight: bold;
`;

export const Box = styled.View`
  height: ${(props: Pick<StylePropTypes, 'height'>) =>
    props.height ? `${props.height}px` : 'auto'};
  width: 100%;

  background-color: ${props => props.theme.colors.box};
`;

export const SubTitle = styled.Text`
  color: ${props => props.theme.colors.text};
  font-size: ${(props: Pick<StylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: 300;
`;

export const Description = styled.Text`
  color: ${props => props.theme.colors.lightText};
  font-size: ${(props: Pick<StylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: 200;
`;

export const FatDescription = styled.Text`
  color: ${props => props.theme.colors.lightText};
  font-size: ${(props: Pick<StylePropTypes, 'fontSize'>) =>
    `${props.fontSize}px`};
  font-weight: 600;
`;

export const Row = styled.View`
  flex-direction: row;
`;

export const BoxInput = styled.TextInput`
  height: 56px;
  width: 100%;
  border-radius: 8px;
  border-color: ${(props: OptionThemeTypes) => {
    if (props.theme) {
      return props.isEmpty ? props.theme.colors.box : props.theme.colors.text;
    } else {
      return 'black';
    }
  }};
  border-width: 1px;
  color: ${props => props.theme.colors.lightText};
  padding-left: 15px;
`;

export const UnderLineInput = styled.TextInput`
  height: 56px;
  width: 100%;
  font-size: 16px;
  border-color: ${props => props.theme.colors.text};
  border-bottom-width: 1px;
  color: ${props => props.theme.colors.text};
  font-weight: 300;
`;

export const Separator = styled.View`
  height: 0.3px;
  width: 100%;
  margin: ${(props: Pick<StylePropTypes, 'marginVertical'>) => {
    return `${props.marginVertical}px 0px`;
  }};
  background-color: ${props => props.theme.colors.text};
  align-self: center;
`;

export const OutlineButton = styled.TouchableOpacity`
  width: 100%;
  height: 56px;
  border-color: ${props => props.theme.colors.accent};
  border-radius: 8px;
  border-width: 1px;
  justify-content: center;
  align-items: center;
`;

export const OutlineButtonText = styled.Text`
  color: ${props => props.theme.colors.accent};
  font-size: 18px;
  font-weight: bold;
`;

export const FakeUnderLineInput = styled.View`
  height: 56px;
  width: 100%;
  font-size: 16px;
  border-color: ${(props: Pick<StylePropTypes, 'theme'>) =>
    props.theme.colors.text};
  border-bottom-width: 1px;
  justify-content: center;
`;

export const Placeholder = styled.Text`
  font-size: 16px;
  color: #c5c5c9;
`;
