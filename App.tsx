import React from 'react';
import {ThemeProvider} from '@emotion/react';
import MainStack from './src/navigator/MainStack';
import {lightTheme} from './src/styles/theme';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  const theme = lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
