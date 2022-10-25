import React from 'react';
import {ThemeProvider} from '@emotion/react';
import MainStack from './src/navigator/MainStack';
import {lightTheme} from './src/styles/theme';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './src/redux/store';
import {Provider} from 'react-redux';

import CodePush from 'react-native-code-push';

const App = () => {
  const theme = lightTheme;
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  updateDialog: {
    title: '새로운 업데이트가 있습니다.',
    optionalUpdateMessage:
      '현재 사용하시는 <전자두뇌 정총무>는 최신 버전이 아닙니다. 업데이트하시겠습니까?',
    optionalInstallButtonLabel: '업데이트',
    optionalIgnoreButtonLabel: '취소',
  },
  installMode: CodePush.InstallMode.IMMEDIATE,
};

export default CodePush(codePushOptions)(App);
