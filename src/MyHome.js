import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions, TouchableOpacity, FlatList, Alert, BackHandler, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import iconhome from '../images/home.png';
import iconliving from '../images/phongkhach.jpg';
import iconslep from '../images/phongngu.jpg';
import iconkitchen from '../images/phongbep.png';
import icongarden from '../images/sanvuon.jpg';
import firebase from '../firebase/firebase.js';
import iconsecu from '../images/baove.jpg';
import icondoamkk from '../images/humidity.png';
import iconnhietdo from '../images/hot.png';
import iconkhigas from '../images/gas.png';
import icondoamdat from '../images/soil.png';
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
                    gas: child.val().gas,
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
                style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                 {Type_}
            </Text>
        </View>
    }
    Item = (item) => {
        return (
            <View style={{
                width: width * 0.9,
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
                                marginHorizontal: 20
                            }}>
                                <Image source={icondoamkk} style={styles.showicon} />
                                <Text style={{
                                    fontSize: 20,
                                    color: 'white'
                                }}>{item.doam} %</Text>
                            </View>


                        ) :
                        null}
                    {item.gas ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20
                        }}>
                            <Image source={iconkhigas} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'white'
                            }}>{item.gas} %</Text>
                        </View>) :
                        null}
                    {item.nhietdo ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20
                        }}>
                            <Image source={iconnhietdo} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'white'
                            }}>{item.nhietdo} &deg;C </Text>
                        </View>) :
                        null}
                    {item.doamdat ?
                        (<View style={{
                            flexDirection: 'column',
                            marginBottom: 10,
                            marginHorizontal: 20
                        }}>
                            <Image source={icondoamdat} style={styles.showicon} />
                            <Text style={{
                                fontSize: 20,
                                color: 'white'
                            }}>{item.doamdat} %</Text>
                        </View>) :
                        null}
                </View>


            </View>
        );
    }
    render() {
        const DATA = [
            {
                id: 'DevicesMan',
                name: 'Phòng khách',
                icon: iconliving,

            },
            {
                id: 'Bedroom',
                name: 'Phòng ngủ',
                icon: iconslep,
            },
            {
                id: 'Kitchenroom',
                name: 'Phòng bếp',
                icon: iconkitchen,
            },

            {
                id: 'Garden',
                name: 'Sân vườn',
                icon: icongarden,
            },

            {
                id: 'Security',
                name: 'Bảo vệ',
                icon: iconsecu,
            },
        ];
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textmyhome}
                    >

                        My Home
                        </Text>

                </View>
                <SafeAreaView style={styles.postTemp}>
                    <FlatList
                        style={{

                        }}
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
        flexDirection: 'row'
    },
    postTemp: {
        flexDirection: 'row',
        backgroundColor: '#725F7C',
        width: null,
        margin: 10,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
        alignItems: 'center',
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
        justifyContent: 'center',
        margin: 10,
        fontSize: 17
    },
    pickimage: {
        borderWidth: 0.5,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#432577',
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
        alignItems: 'center',
        margin: 10,
        backgroundColor: 'white',
        justifyContent: 'center',
        width: null,
        margin: 14,
        padding: width * 3.6 / 187.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 4,
    },
    showicon: {
        borderWidth: 0.4,

        width: 30,
        height: 30,

    },
})
// class Tempthorizon{
//     render(){
//         return(

//         );
//     }
// }
