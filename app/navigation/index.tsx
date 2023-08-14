import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import {useSelector} from 'react-redux';
import {selectIsSign} from '../store/features/auth/authSlice';
import Signin from '../screens/Signin';
import Signup from '../screens/Signup';
import {StatusBar} from 'react-native';
import Function from '../screens/Function';
import CustomFunction from '../screens/CustomFunction';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const isSign = useSelector(selectIsSign);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={DefaultTheme.colors.background} />
      {isSign ? (
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Function" component={Function} />
          <Stack.Screen name="CustomFunction" component={CustomFunction} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{headerShown: false, animation: 'fade'}}>
          <Stack.Screen name="Signin" component={Signin} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}