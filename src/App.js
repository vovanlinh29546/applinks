import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from "./Splash.js";
import Login from "./Login.js";
import Myhome from "./MyHome.js";
import DevicesMan from "./DevicesMan.js";
import Bedroom from "./Bedroom.js";
import Kitchenroom from "./Kitchenroom.js";
import Garden from "./garden.js";
import Security from "./Security.js";
const StackHome = createStackNavigator();




const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" headerMode="none">
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Myhome" component={Myhome} />
        <Stack.Screen name="DevicesMan" component={DevicesMan} />
        <Stack.Screen name="Bedroom" component={Bedroom} />
        <Stack.Screen name="Kitchenroom" component={Kitchenroom} />
        <Stack.Screen name="Garden" component={Garden} />
        <Stack.Screen name="Security" component={Security} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;