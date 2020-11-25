import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from "./Splash.js";
import Login from "./Login.js";
import Register from "./Register.js";
import Myhome from "./MyHome.js";
import DevicesMan from "./DevicesMan.js";
import Bedroom from "./Bedroom.js";
import Kitchenroom from "./Kitchenroom.js";
import Garden from "./garden.js";
import Security from "./Security.js";
import Weather from "./Weather.js";




const Stack = createStackNavigator();
console.disableYellowBox = true;//tat thông báo màu vàng
function App() {
  
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#432577',

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}
      >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Đăng ký" component={Register}  />
        <Stack.Screen name="Trang chủ" component={Myhome}
          options={{

            headerLeft: null
          }} />
        <Stack.Screen name="Phòng khách" component={DevicesMan} />
        <Stack.Screen name="Phòng ngủ" component={Bedroom} />
        <Stack.Screen name="Phòng bếp" component={Kitchenroom} />
        <Stack.Screen name="Sân vườn" component={Garden} />
        <Stack.Screen name="Bảo vệ" component={Security} />
        <Stack.Screen name="Thời tiết" component={Weather} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;