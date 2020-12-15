import * as React from 'react';
import {Button,TouchableOpacity,Dimensions,Text,View,SafeAreaView,Image  } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../images/logo.png';
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
import Tutorial from "./tutorial.js";
import CRRooms from "./Createroom.js";
import CRDevices from "./Createdevices.js";
import firebaseConfig from '../firebase/firebase.js';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
console.disableYellowBox = true;//tat thông báo màu vàng

function CustomDrawerContent(props) {
  return (
<SafeAreaView style={{flex: 1}}>
 <Image
  resizeMode={'center'}
         source={logo}
     style={{
        alignSelf: 'center',
        width: width * 0.4,
        height: height * 0.4,    
     }}
      />
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Đăng xuất" onPress={() => firebaseConfig.auth().signOut()
              .then(() =>  props.navigation.navigate('Đăng nhập'))} 
      icon={(focused, color, size)=> <MaterialIcons color={'gray'} size={25} name='exit-to-app'/>}
       />
    </DrawerContentScrollView>
</SafeAreaView>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="Trang chủ" 
      drawerContentOptions={{
    itemStyle: { marginVertical: 5 },
  }}
    drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Trang chủ" component={MainStack} />
        <Drawer.Screen name="Room" component={CRRooms} options={{ title: 'Thêm phòng ' }} />
        <Drawer.Screen name="Devices" component={CRDevices} options={{ title: 'Thêm thiết bị ' }} />
    </Drawer.Navigator>
  );
}


const MainStack = () => {
  return (
 <Stack.Navigator initialRouteName="Splash"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#444444',
            // alignItems: 'center'

          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize:25
          },
        }}
      >
        <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
        <Stack.Screen name="Đăng nhập" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Đăng ký" component={Register}  />
        <Stack.Screen name="Trang chủ" component={Myhome}  
        options={({ navigation })=>
        (
          {headerLeft: null,
           headerRight: () => <TouchableOpacity style={{
         flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        paddingRight:10,
      }}
       onPress={() => {
navigation.dispatch(DrawerActions.openDrawer());

       }}
       >
              <AntDesign name={'setting'} size={35} color={ 'white'}/>
    </TouchableOpacity> 
        })
        }
         />
        <Stack.Screen name="Phòng khách" component={DevicesMan} />
        <Stack.Screen name="Phòng ngủ" component={Bedroom} />
        <Stack.Screen name="Phòng bếp" component={Kitchenroom} />
        <Stack.Screen name="Sân vườn" component={Garden} />
        <Stack.Screen name="Bảo vệ" component={Security} />
        <Stack.Screen name="Thời tiết" component={Weather} />
        <Stack.Screen name="Hướng dẫn" component={Tutorial} options={{ headerShown: false }} />


      </Stack.Navigator>
  );
};

function App() {
  
  return (

    <NavigationContainer>
     
     <MyDrawer/>

    </NavigationContainer>

  );
}
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
export default App;




