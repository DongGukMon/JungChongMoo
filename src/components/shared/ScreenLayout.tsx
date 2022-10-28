import styled from '@emotion/native';
import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import {StylePropTypes} from '../../types/shared/emotion';

export const Container = styled.ScrollView`
  background-color: ${props => props.theme.colors.main};
  flex: 1;
`;

const ScreenLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'red'}}
      keyboardVerticalOffset={100}>
      <Container>{children}</Container>
    </KeyboardAvoidingView>
  );
};
export default ScreenLayout;
