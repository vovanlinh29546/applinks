import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, TouchableOpacity, FlatList, Alert, BackHandler, SafeAreaView, ImageBackground,ActivityIndicator } from 'react-native'
import iconliving from '../images/phongkhach.jpg';
import iconslep from '../images/phongngu.jpg';
import iconkitchen from '../images/Kitchens.jpg';
import icongarden from '../images/sanvuon.jpg';
import firebase from '../firebase/firebase.js';
import iconsecu from '../images/baove.jpg';
import icondoamkk from '../images/humidity.png';
import iconnhietdo from '../images/hot.png';
import iconkhigas from '../images/gas.png';
import iconkhigasco from '../images/khico.png';
import iconkhigassmoke from '../images/gassmoke.png';
import icondoamdat from '../images/soil.png';
import iconthoitiet from '../images/thoitiet.jpg';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { color } from 'react-native-reanimated';
//croll horizi
import SwiperFlatList from 'react-native-swiper-flatlist';
import Swiper from 'react-native-swiper'
import Voice from '@react-native-community/voice';
//custom
import CustomHeader from "./CustomHeader.js";
export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '0',
            post: [],
            showtem:false,
           changecolor:false
        }

        this.itemsRef = firebase.database().ref().child('sensor');
       //  Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
         Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
         Voice.onSpeechResults = this.onSpeechResults.bind(this);
    }
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            // var newPost = snap.val();
            snap.forEach((child) => {
                let item = {
                    id: (child.key),
                    doam: child.val().doam,
                    khilpg: child.val().khilpg,
                    khico: child.val().khico,
                    khoi: child.val().khoi,
                    nhietdo: child.val().nhietdo,
                    doamdat: child.val().doamdat,
                }
                items.push(item);
            });


            this.setState({
                post: items,
                showtem:true
                // showbutton: false
            });


        });

    }
    backAction = () => {//thông báo có muốn thoát khỏi app ko
        Alert.alert("Hold on!", "Bạn có muốn thoát khỏi app?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };
    componentDidMount() {
        this.listenForItems(this.itemsRef)
        
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }
    componentWillUnmount() {
        this.listenForItems(this.itemsRef)
        Voice.destroy().then(Voice.removeAllListeners)
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }
    _backaction() {
        Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    }
    itemSeparatorComponent = () => {
        return <View style={
            {
                height: '100%',
                width: 5,
                backgroundColor: 'red',
            }
        }
        />
    }
    ShowRoom(type) {

        let Type_ = 'Phòng'
        switch (type) {
            case 'phongbep':
                Type_ = 'Phòng bếp'
                break
            case 'phongkhach':
                Type_ = 'Phòng khách'
                break
            case 'phongngu':
                Type_ = 'Phòng ngủ'
                break
            case 'sanvuon':
                Type_ = 'Sân vườn'
                break
            default:
                break;
        }
        return <View>
            <Text
                style={{ fontSize: 16, color: 'black', fontWeight: 'bold' }}>
                {Type_}
            </Text>
        </View>
    }
    Item = (item) => {
        return (
            <View style={{
                width: width * 0.9 -10,
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                {this.ShowRoom(item.id)}
                <View
                    style={{
                        flexDirection: 'row'

                    }}>
                    {item.doam ?
                        (
                            <View style={{
                                flexDirection: 'column',
                                marginBottom: 10,
                                marginHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <Image source={icondoamkk} style={styles.showicon} />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'black'
                                }}>{item.doam}%</Text>
                            </View>


                        ) :
                        null}
                    {item.khilpg ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigas} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khilpg}</Text>
                        </View>) :
                        null}
                    {item.khico ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigasco} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khico}</Text>
                        </View>) :
                        null}
                    {item.khoi ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigassmoke} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khoi}</Text>
                        </View>) :
                        null}
                    {item.nhietdo ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconnhietdo} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.nhietdo}&deg;C</Text>
                        </View>) :
                        null}
                    {item.doamdat ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={icondoamdat} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.doamdat}%</Text>
                        </View>) :
                        
                        null}

                </View>

<View style={{ height: 20}} />
            </View>
        );
    }
    goodMorning() {

        const date = new Date();
        const hour = date.getHours();
        
        if (10 >= hour && hour > 0) {
            return <View>
                <Text style={styles.txtGood}>Chào buổi sáng   <Icons name={'weather-sunset'} size={25} color={'#FFFFFF'}/></Text>
            </View>
        }
        else if (hour > 10 && 12 >= hour) {
            return <View>
                <Text style={styles.txtGood}>Chào buổi trưa   <Icons name={'white-balance-sunny'} size={25} color={'#FFFFFF'}/></Text>
            </View>
        }
        else if (hour > 12 && 18 >= hour) {
            return <View>
                <Text style={styles.txtGood}>Chào buổi chiều   <Icons name={'weather-sunset-down'} size={25} color={'#FFFFFF'}/></Text>
            </View>
        } else {
            return <View>
                <Text style={styles.txtGood}>Chào buổi tối   <Icons name={'weather-night'} size={25} color={'#FFFFFF'}/></Text>
            </View>
        }

    };
        onSpeechEndHandler=e=>{
this.setState({changecolor:false})  }
    StartRecor=async()=>{
  try {
      await   Voice.start('Vi');
      this.setState({changecolor:true})
        this.onSpeechResults
        
  } catch (error) {
      console.log(error)
  }
  }
      onSpeechResults=e=>{
        let value=e.value[0].toLowerCase().trim()
        let status=false;
        console.log(value)
        switch (value) {
            case 'mở đèn phòng khách':
                this._changeled("phongkhach","Den",true)
                status=true
                break
            case 'tắt đèn phòng khách':
                this._changeled("phongkhach","Den",false)
                status=true
                break
            case 'mở quạt phòng khách':
                   this._changeled("phongkhach","Quat",true)
                   status=true
                break
            case 'tắt quạt phòng khách':
                    this._changeled("phongkhach","Quat",false)
                    status=true
                break
            case 'mở cửa sổ phòng khách':
                   this._changeled("phongkhach","Cuaso",true)
                   status=true
                break
            case 'tắt cửa sổ phòng khách':
                    this._changeled("phongkhach","Cuaso",false)
                    status=true
                break
            // điều khiển phòng ngủ
            case 'mở đèn phòng ngủ':
                this._changeled("phongngu","Den",true)
                status=true
                break
            case 'tắt đèn phòng ngủ':
                this._changeled("phongngu","Den",false)
                status=true
                break
            case 'mở quạt phòng ngủ':
                   this._changeled("phongngu","Quat",true)
                   status=true
                break
            case 'tắt quạt phòng ngủ':
                    this._changeled("phongngu","Quat",false)
                    status=true
                break
            case 'mở cửa sổ phòng ngủ':
                   this._changeled("phongngu","Cuaso",true)
                   status=true
                break
            case 'tắt cửa sổ phòng ngủ':
                    this._changeled("phongngu","Cuaso",false)
                    status=true
                break
            default:

                break;
        }
        if(status){
        return    Alert.alert("Thông báo!", value+" thành công", [

            { text: "Đồng ý"}
        ]);
        }
        else{
        return  Alert.alert("Thông báo!", "Lỗi cú pháp: "+value+" (mở/tắt + tên thiết bị + tên phòng)", [

            { text: "Thử lại"}
        ]);
        }
            
            
        
  }
      _changeled(tenphong,devices, values) {

        firebase.database().ref('controls/'+tenphong).child(devices).update({
            'trangthai': values,
        })
    }
    render() {
        const DATA = [
            {
                id: 'Phòng khách',
                name: 'Phòng khách',
                icon: iconliving,

            },
            {
                id: 'Phòng ngủ',
                name: 'Phòng ngủ',
                icon: iconslep,
            },
            {
                id: 'Phòng bếp',
                name: 'Phòng bếp',
                icon: iconkitchen,
            },

            {
                id: 'Sân vườn',
                name: 'Sân vườn',
                icon: icongarden,
            },

            {
                id: 'Bảo vệ',
                name: 'Bảo vệ',
                icon: iconsecu,
            },
            {
                id: 'Thời tiết',
                name: 'Thời tiết',
                icon: iconthoitiet,
            },
        ];
        
        return (
            <View style={styles.container}>
            <CustomHeader title="Trang chủ" navigation={this.props.navigation} ishome={true} setting={true}/>
                <ImageBackground source={require('../images/Myhouse.jpg')} style={styles.image}>
                <View style={styles.header}>
                    {this.goodMorning()}
     </View>
                <SafeAreaView  style={styles.postTemp} >
                    {/* <FlatList
                        style={{}}
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                        data={this.state.post}
                        renderItem={({ item }) => this.Item(item)}
                        numColumns={1}
                        keyExtractor={item => item.id}
                    /> */}
      {/* <SwiperFlatList 
             data={this.state.post}
                        renderItem={({ item }) => this.Item(item)}
                        showPagination
                        autoplay
                        autoplayLoop

                        paginationActiveColor="#432577"
                        paginationDefaultColor="rgba(79, 79, 79,0.9)"
                       paginationStyle={{Top: 10}}
                    
            >

             </SwiperFlatList> */}
             {this.state.showtem ?(
            <Swiper  
                    loop={true} 
                    //showsButtons={true}
                    autoplay
                    index={1}
                    style={{

                    height:height*0.18,
                    }}

             >
          {
            this.state.post.map((item, i) => 
            <View 
                                style={{
                        
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                    }}>
          {this.ShowRoom(item.id)}
                <View
                    style={{
                        flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                    }}>
                    {item.doam ?
                        (
                            <View style={{
                                flexDirection: 'column',
                                marginBottom: 10,
                                marginHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                            }}>
                                <Image source={icondoamkk} style={styles.showicon} />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'black'
                                }}>{item.doam}%</Text>
                            </View>


                        ) :
                        null}
                    {item.khilpg ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigas} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khilpg}</Text>
                        </View>) :
                        null}
                    {item.khico ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigasco} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khico}</Text>
                        </View>) :
                        null}
                    {item.khoi ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconkhigassmoke} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.khoi}</Text>
                        </View>) :
                        null}
                    {item.nhietdo ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={iconnhietdo} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.nhietdo}&deg;C</Text>
                        </View>) :
                        null}
                    {item.doamdat ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <Image source={icondoamdat} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'black'
                            }}>{item.doamdat}%</Text>
                        </View>) :
                        
                        null}

                </View>

            </View>
            )
          }
        </Swiper>
             )
             :(<ActivityIndicator size="large" color="ff00000" />)
             }
             
                </SafeAreaView>
               

                <FlatList
                    data={DATA}

                    renderItem={({ item }) =>

                        

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(item.id)
                                }}
                                style={styles.btninsert}  >
                                <Text style={styles.texttenphong}>
                                    {item.name}
                                </Text>
                                <Image source={
                                    item.icon
                                } style={styles.pickimagerom} />
                            </TouchableOpacity>
                        


                    }
                    numColumns={2}
                    keyExtractor={item => item.id}
                />
                                <View
                    style={{
                        flexDirection: 'row',
                           justifyContent: 'center',
                            alignContent:'center',
                            alignItems:'center',
                        paddingHorizontal: width * 0.11,
                        paddingVertical: 4,
                        // backgroundColor: '#444444'
                        //marginBottom: Platform.OS === 'ios' ? 20 : 0
                    }}
                >
                                <View
                                    style={{
                                        height: 2,
                                        backgroundColor: '#fff',
                                        marginTop: 10,
                                        width: width*0.2,
                                    }}
                                />
              <TouchableOpacity
              style={{
                alignItems: 'center',
                 justifyContent: 'center',
            }}
                onPress={() => {
                             this.StartRecor()
                                }}
                                  >
                                                          
                  <MaterialIcons name={'keyboard-voice'} size={40} color={this.state.changecolor  ? 'purple' : 'white'}
                     />

                            </TouchableOpacity>
                                                            <View
                                    style={{
                                        height: 2,
                                        backgroundColor: '#fff',
                                        marginTop: 10,
                                        width: width*0.2,
                                    }}
                                />
                </View>
                </ImageBackground>
            </View>
        )
    }
}
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: width * 3.6 / 187.5,
        alignContent: 'center',
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        height: 120,
        backgroundColor: 'rgba(79, 79, 79,0.9)',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
    },
    postTemp: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        width: null,
        margin: 20,
        marginTop: -60,
        padding: width * 0.005,
        borderRadius: width * 3.6 / 187.5,
        justifyContent: 'center',
    },
    textalldevices: {
        flexDirection: 'column',

    },
    textalldevice1: {
        fontSize: 20,
        color: 'white'
    },
    textco: {
        color: 'white'
    },
    textmyhome: {
        color: 'black',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 10
    },
    texttenphong: {
        color: 'black',
        
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        margin: 10,
        fontSize: 17
    },
    pickimage: {
        borderWidth: 0.5,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#444444',
        width: 100,
        height: 100,
    },
    pickimagerom: {
        borderWidth: 0.5,
        marginHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 120,
        height: 120,
    },
    btninsert: {
        height: height * 0.3,
        
        margin:15,
        backgroundColor: 'rgba(248, 248, 255, 0.9)',
                                        alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center',
        width: width * 0.42,
        padding: width * 3.6 / 187.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        borderRadius: 15,
        elevation: 4,
    },
    showicon: {
        borderWidth: 0.4,

        width: 30,
        height: 30,

    },
    txtGood: {
        color: '#FFFFFF',
        fontSize: 15,
        marginLeft: 20,
        marginTop:-50,
        fontWeight: 'bold'
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
})
