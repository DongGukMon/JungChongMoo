import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import CalculateScreen from '../screens/CalculateScreen';
import Home from '../screens/Home';
import ModifyCalculateScreen from '../screens/ModifyCalculateScreen';
import ModifyPaymentScreen from '../screens/ModifyPaymentScreen';
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
        name="ModifyCalculateScreen"
        component={ModifyCalculateScreen}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: lightTheme.colors.text,
        }}
      />
      <Stack.Screen
        name="CalculateScreen"
        component={CalculateScreen}
        options={{
          headerTitle: '',
          headerBackTitleVisible: false,
          headerTintColor: lightTheme.colors.text,
        }}
      />
      <Stack.Screen
        name="ModifyPaymentScreen"
        component={ModifyPaymentScreen}
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
