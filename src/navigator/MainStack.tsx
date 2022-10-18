import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch} from 'react-redux';
import GroupDetailScreen from '../screens/GroupDetailScreen';
import Home from '../screens/Home';
import goToModifyGroupScreen from '../screens/ModifyGroupScreen';
import ModifyPaymentScreen from '../screens/ModifyPaymentScreen';
import ResultScreen from '../screens/ResultScreen';
import {lightTheme} from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {initializeGroups} from '../redux/slice/gorupsSlice';
import {useEffect} from 'react';
import {initializePayments} from '../redux/slice/paymentSlice';

const Stack = createStackNavigator();

function MainStack() {
  const dispatch = useDispatch();

  const initializeData = async () => {
    // AsyncStorage.clear();
    const rawGroups = await AsyncStorage.getItem('groups');
    const rawPayments = await AsyncStorage.getItem('payments');

    if (rawGroups) {
      const groups = JSON.parse(rawGroups);
      dispatch(initializeGroups(groups));
    }
    if (rawPayments) {
      const payments = JSON.parse(rawPayments);
      dispatch(initializePayments(payments));
    }
  };

  useEffect(() => {
    initializeData();
  }, []);

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
        name="ModifyGroup"
        component={goToModifyGroupScreen}
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
