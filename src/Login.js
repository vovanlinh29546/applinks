import * as React from 'react';
import {Switch, ScrollView, Text, View, StyleSheet, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback, Alert, SafeAreaView,BackHandler } from 'react-native';

import { ProgressDialog } from '../node_modules/react-native-simple-dialogs';
import firebaseConfig from '../firebase/firebase.js';
import logo from '../images/logo.png';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
//rememlogin
import {setUserName, getUserName,
  setUserPassWord, getUserPassWord,
  setIsRemembered, getIsRemembered,
  removeRememberMe,
} from "./auth";
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
    };
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
    const { email, password,rememberMe } = this.state;
    
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
        this.props.navigation.navigate('Myhome', {
          email: email,

        })
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
    const {rememberMe} = this.state;
    this.setState({rememberMe: !rememberMe});
  };
  componentDidMount = async () => {
    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp()
      return true;
    });
    try {

      const isRemembered = await getIsRemembered();
      if (isRemembered === "yes") {
        const username = await getUserName();
        const password = await getUserPassWord();
        console.log(username);
        
        this.setState({rememberMe: true});
        this.setState({ password: password });
        this.setState({ email: username });
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  componentWillUnmount(){
    BackHandler.addEventListener('hardwareBackPress', function() {
      BackHandler.exitApp()
      return true;
    });
}

  render() {
    const { email, password, rememberMe,  } = this.state;
    return (
      <SafeAreaView
        style={styles.backgroundcontainer}>
        <View style={styles.logocontainer}>
          <Image
            source={logo}
            style={styles.logo}
          />
          <Text style={styles.logotext}>Login</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled" style={styles.inputcontainerall} >
          <KeyboardAvoidingView style={styles.inputcontainerall} behavior="position" enabled>
            <TouchableWithoutFeedback style={styles.inputcontainerall}>
              <View style={styles.inputcontainerall}>


                <View style={styles.inputcontainer}>
                <Icon name={'ios-mail'} size={28} color={'gray'}
                style={styles.inputicon}/>
                  <TextInput
                    style={styles.input}
                    placeholder="Username"
                    placeholderTextColor={'white'}
                    returnKeyType="next"
                    underlineColorAndroid='transparent'
                    onChangeText={(email) => this.setState({ email })}
                    value={this.state.email}
                    ref={input => { this.email = input }}
                    keyboardType='email-address'

                  />

                </View >
                <View style={styles.inputcontainer}>

                <Icon name={'ios-lock-open-sharp'} size={28} color={'gray'}
                style={styles.inputicon}/>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={this.state.showPass}
                    placeholderTextColor={'white'}
                    underlineColorAndroid='transparent'
                    onChangeText={(password) => this.setState({ password })}
                    value={this.state.password}
                    ref={input => { this.password = input }}
                  />

                <TouchableOpacity style={styles.btneye} onPress={this.showPass.bind(this)}>
                <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={26} color={'white'}  />
                </TouchableOpacity>
                </View>
                <View style={styles.inputremem}>
                  <Text>Lưu mật khẩu?</Text>
                <Switch
                      trackColor={{ false: "#DCDCD8", true: "#432577" }}
                      thumbColor={rememberMe ? "#ECDB97" : "#FFFFFF"}
                      onValueChange={this.toggleSwitch}
                      value={rememberMe}
                     
                    />

                </View>

                <View style={styles.inputcontainer}>
                  <TouchableOpacity style={styles.btnlogin}
                    onPress={this.getData.bind(this, this.state.email, this.state.password)}  >
                    <Text style={styles.textlogin}>Login</Text>
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
      </SafeAreaView>
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
    width: null,
    height: null,
    backgroundColor:'white'
  },
  logocontainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 30,
  },

  logo: {
    width: WIDTH*0.4,
    height: HEIGHT*0.2,

  },
  logotext: {
    fontSize: 24,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5,
    marginBottom: 10,
  },
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'white',
    marginHorizontal: 25,
    borderColor: 'black',
    borderWidth: 0.5,

  },
  inputcontainer: {
    marginTop: 10,
  },
  inputremem: {
    marginTop: 10,
    flexDirection:'row',
    alignItems:'center',
    marginLeft: 22,
  },
  inputcontainerall: {
    width: '100%',
    height:'100%',
  },

  btnlogin: {
    marginTop: 10,
    width: WIDTH - 55,
    height: 45,
    borderRadius: 25,
    backgroundColor: '#432577',
    justifyContent: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    marginLeft: 22,

  },
  textlogin: {
    color: 'white',
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