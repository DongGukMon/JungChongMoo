import React from 'react';
import {ThemeProvider} from '@emotion/react';
import MainStack from './src/navigator/MainStack';
import {lightTheme} from './src/styles/theme';
import {NavigationContainer} from '@react-navigation/native';

import {store} from './src/redux/store';
import {Provider} from 'react-redux';

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

export default App;
