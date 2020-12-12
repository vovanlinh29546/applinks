import * as React from 'react';
import { Switch, ScrollView, Text, View, StyleSheet, ImageBackground, TextInput, Dimensions,Image, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Alert, SafeAreaView, BackHandler } from 'react-native';

import { ProgressDialog } from '../node_modules/react-native-simple-dialogs';
import firebaseConfig from '../firebase/firebase.js';
import logo from '../images/logo.png';

import Icon from '../node_modules/react-native-vector-icons/Ionicons';

import {
  setUserName, getUserName,
  setUserPassWord, getUserPassWord,
  setIsRemembered, getIsRemembered,
  removeRememberMe,
} from "./auth";
import PushNotification from"react-native-push-notification";
export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      showPass: true,
      press: false,
      showProgress: false,
      rememberMe: false,
      madevices:""
    };
    // this._setToken = this._setToken.bind(this)
  }

  openProgress = (kt) => {
    this.setState({ showProgress: kt });
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }

  getData = (email, password) => {
    if (email != '' && password != '') {
      this.setState({
        email: '',
        password: ''
      })
      this.openProgress(true);
      this.onLogin();

    } else {

      Alert.alert('Lỗi! ', 'Vui lòng nhập đầy đủ thông tin!', [], { cancelable: true });
    }

  }

  onLogin = () => {
    const { email, password, rememberMe } = this.state;

    if (rememberMe) {
      setUserName(email);
      setUserPassWord(password);
      setIsRemembered();
    }
    else {
      removeRememberMe();
    }

    firebaseConfig.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        // If you need to do anything with the user, do it here
        this.props.navigation.navigate('Trang chủ', {
          email: email,

        })
        this._changeTokenFCM(email)
        this.openProgress(false);

      })
      .catch((error) => {
        const { code, message } = error;
        // representation of the error
        this.openProgress(false),
          Alert.alert('Lỗi! ', 'Vui lòng đăng nhập lại', [], { cancelable: true })
      });
  }
  showPass = () => {
    if (this.state.press == false) {
      this.setState({ showPass: false, press: true })
    } else {
      this.setState({ showPass: true, press: false })
    }
  }
  toggleSwitch = () => {
    const { rememberMe } = this.state;
    this.setState({ rememberMe: !rememberMe });
  };
  _changeTokenFCM(name) {

PushNotification.configure({
  onRegister: function (tokens) {
  //  madevices=tokens.token;
        firebaseConfig.database().ref('notifications/devices').update({
          'name':name,
          'token': tokens.token,
        })
  },
 
  
});
    }
  componentDidMount = async () => {
    let {madevices}=this.setState;
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp()
      return true;
    });
    try {
      const isRemembered = await getIsRemembered();
      if (isRemembered === "yes") {
        const username = await getUserName();
        const password = await getUserPassWord();
        console.log(username);

        this.setState({ rememberMe: true });
        this.setState({ password: password });
        this.setState({ email: username });
      }
    } catch (error) {
      console.log("Error", error);
    }
    PushNotification.configure({
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

  //  notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
 
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
 
    // process the action
  },
 
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
 
  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
  
});
  }
  componentWillUnmount() {
    BackHandler.addEventListener('hardwareBackPress', function () {
      BackHandler.exitApp()
      return true;
    });
  }

  render() {
    const { email, password, rememberMe,madevices } = this.state;
    return (
      <View
      // source={
      //    bgimage}
      style={styles.backgroundcontainer}>
        <View style={styles.logocontainer}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <Text style={styles.logotext}>Đăng nhập</Text>
        </View>

        <ScrollView keyboardShouldPersistTaps="handled" style={styles.inputcontainerall} >

          <KeyboardAvoidingView style={styles.inputcontainerall} behavior="position" enabled>

            <TouchableWithoutFeedback style={styles.inputcontainerall}>
              <View style={styles.inputcontainerall}>


                <View style={styles.inputcontainer}>
                  <Icon name={'ios-mail'} size={28} color={'black'}
                    style={styles.inputicon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={'black'}
                    returnKeyType="next"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    ref={input => { this.email = input }}
                    keyboardType='email-address'

                  />

                </View >
                <View style={styles.inputcontainer}>

                  <Icon name={'ios-lock-open-sharp'} size={28} color={'black'}
                    style={styles.inputicon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={this.state.showPass}
                    placeholderTextColor={'black'}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    ref={input => { this.password = input }}
                  />

                  <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
                    <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'black'} />
                  </TouchableOpacity>
                </View>
                <View style={styles.inputremem}>
                  <Text style={styles.textlogin}>Lưu mật khẩu?</Text>
                  <Switch
                    trackColor={{ false: "#DCDCD8", true: "#4D128D" }}
                    thumbColor={rememberMe ? "#ECDB97" : "#FFFFFF"}
                    onValueChange={this.toggleSwitch}
                    value={rememberMe}

                  />

                </View>

                <View style={styles.inputcontainer}>
                  <TouchableOpacity style={styles.btnlogin}
                    onPress={this.getData.bind(this, this.state.email, this.state.password)}  >
                    <Text style={styles.textlogin2}>Đăng nhập</Text>
                  </TouchableOpacity>

                </View>
                <View style={styles.inputcontainer}>
                  <TouchableOpacity 
                     onPress={() => {
                      this.props.navigation.navigate("Đăng ký")
                  }}  >
                    <Text style={styles.textlogin}>Đăng ký tài khoản mới?</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView >
        </ScrollView>
        <ProgressDialog
          title="Loading"
          activityIndicatorColor="blue"
          activityIndicatorSize="large"
          animationType="fade"
          message="Please, wait..."
          visible={this.state.showProgress}
        />
      </View>
    );
  }
}
const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')
const styles = StyleSheet.create({
  backgroundcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH,

  },
logocontainer: {
    alignItems: 'center',
    marginTop: 20,
  },

  logo: {
    marginTop:40,
    width: WIDTH * 0.4,
    height: HEIGHT * 0.2,

  },
  logotext: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    
  },
  input: {
    width: WIDTH *0.85,
    height: 45,
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    color: 'black',
    marginHorizontal: 25,
    borderColor: 'black',
    borderWidth: 0.5,

  },
  inputcontainer: {
    marginTop: 15,
    alignItems: 'center',

  },
  inputremem: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 22,
  },
  inputcontainerall: {
    marginTop:20,
    width: '100%',
    height: '100%',
  },

  btnlogin: {
    marginTop: 10,
    width: WIDTH *0.5,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#4D128D',
    justifyContent: 'center',
    alignContent:'center',
    alignItems:'center',
    borderColor: 'white',
    borderWidth: 0.5,
    marginLeft: 22,

  },
  textlogin: {
    marginLeft:20,
    color: 'black',
    fontSize: 16,
    textAlign: 'center',

  },
  textlogin2: {
    color: '#F8F8FF',
    fontSize: 16,
    textAlign: 'center',
  },
  textregis: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  inputicon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },
  btneye: {
    position: 'absolute',
    right: 37,
    top: 8,
  },
});