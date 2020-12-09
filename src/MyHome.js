import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, TouchableOpacity, FlatList, Alert, BackHandler, SafeAreaView, ImageBackground } from 'react-native'
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
import { color } from 'react-native-reanimated';
export default class Splash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '0',
            post: [],
        }
        this.itemsRef = firebase.database().ref().child('sensor');
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


            </View>
        );
    }
    goodMorning() {

        const date = new Date();
        const hour = date.getHours();
        console.log('fsfsfs', hour);
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
                <ImageBackground source={require('../images/Myhouse.jpg')} style={styles.image}>
                <View style={styles.header}>
                    {this.goodMorning()}
                </View>
                <SafeAreaView style={styles.postTemp}>
                    <FlatList
                        style={{}}
                        horizontal
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={false}
                        legacyImplementation={false}
                        data={this.state.post}
                        renderItem={({ item }) => this.Item(item)}
                        numColumns={1}
                        keyExtractor={item => item.id}
                    />
                </SafeAreaView>
                {/* <View
                    style={styles.postTemp}
                >

                    <Image source={
                        this.state.image == '0' ? iconhome : { uri: this.state.image }
                    } style={styles.pickimage} />
                    <View style={styles.textalldevices}>
                        <Text
                            style={styles.textalldevice1}
                        >
                            Tất cả các phòng
                        </Text>
                        <Text style={styles.textco}
                        >
                            5 phòng
                        </Text>
                    </View>

                </View> */}

                <FlatList
                    data={DATA}

                    renderItem={({ item }) =>

                        <View style={styles.btninsert}>

                            <TouchableOpacity
                                onPress={() => {
                                    this.props.navigation.navigate(item.id)
                                }}  >
                                <Text style={styles.texttenphong}>
                                    {item.name}
                                </Text>
                                <Image source={
                                    item.icon
                                } style={styles.pickimagerom} />
                            </TouchableOpacity>
                        </View>


                    }
                    numColumns={2}
                    keyExtractor={item => item.id}
                />
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
        marginHorizontal: 10,
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
