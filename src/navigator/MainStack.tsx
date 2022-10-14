import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import Home from '../screens/Home';
import NewCalculate from '../screens/NewCalculate';
import {lightTheme} from '../styles/theme';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator screenOptions={{headerShadowVisible: false}}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="NewCalculate"
        component={NewCalculate}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: lightTheme.colors.text,
        }}
      />
    </Stack.Navigator>
  );
}

export default MainStack;
