import {createStackNavigator} from '@react-navigation/stack';
import {Text} from 'react-native';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import Home from '../screens/Home';
import ModifyCalculateScreen from '../screens/ModifyCalculateScreen';
import ModifyPaymentScreen from '../screens/ModifyPaymentScreen';
import ResultScreen from '../screens/ResultScreen';
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
        name="GroupDetail"
        component={GroupDetailScreen}
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
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
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
