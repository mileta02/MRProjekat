import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './home';
const Stack = createNativeStackNavigator();

export default function HomeScreen() {
  return (
      <Stack.Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
        <Stack.Group>
          <Stack.Screen name="home" component={Home} />
        </Stack.Group>
      </Stack.Navigator>
  );
}


