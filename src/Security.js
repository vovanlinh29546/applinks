import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView, ScrollView,
    TextInput,
    Button, Image,
    TouchableOpacity, Alert, SafeAreaView,ActivityIndicator
} from 'react-native'
import { Switch } from 'react-native-switch';
import { Dimensions, } from 'react-native';
import firebase from '../firebase/firebase.js';
import ImagePicker from 'react-native-image-picker';
//import Constants from 'expo-constants';
import { request, PERMISSIONS } from 'react-native-permissions';
import Modal from 'react-native-modal'
import imgaaddpic from '../images/imgaaddpic.jpg';
import back from '../images/back.png';
import { ProgressDialog } from 'react-native-simple-dialogs';
import iconliving from '../images/baove.jpg';
export default class Security extends Component {
    constructor(props) {
        super(props)
        this.state = {
            postContent: '',
            post: [],
            modalVisible: false,
            showProgress: false,
            nhietdo: '',
            doam: '',
            showbutton: true,
        }

        this.itemsRef = firebase.database().ref().child('controls/baove');

    }


    _changeled(ten, values) {

        firebase.database().ref().child('controls/baove').child(ten).update({
            trangthai: values
        })


    }


    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
                let item = {
                    id: (child.key),
                    trangthai: child.val().trangthai,
                    image: child.val().image,
                    ten: child.val().ten,
                }
                items.push(item);
            });


            this.setState({
                post: items,
                showbutton: false,
            });
            this.state.post.map((item, idx) => {
                console.log(item.id)
            })

        });
    }


    componentDidMount() {
        this.listenForItems(this.itemsRef)

        
    }
    componentWillUnmount(){
        this.listenForItems(this.itemsRef)
    }

    _hideDialog = () => {
        this.setState({ modalVisible: false })
    }
    _showDialog = () => {
        this.setState({ modalVisible: true })
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.btninsert}>
                    <View style={styles.viewback}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}  >
                            <Image source={
                                back}

                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.viewtenroom}>
                        <Image source={
                            iconliving
                        } style={styles.pickimagerom}></Image>
                        <Text style={styles.textco}>Bảo vệ</Text>
                    </View>


                </View>

                <ScrollView>
                <View>
                {this.state.showbutton ? <ActivityIndicator size="large" color="ff00000" />

                    :
                <FlatList
                    data={this.state.post}

                    renderItem={({ item }) =>

                        <View style={styles.postContainer}>



                            <Text style={styles.textdevices}>
                                {item.ten}
                            </Text>
                            <Image source={{ uri: item.image }} style={styles.showimage} />
                            <Switch
                                onValueChange={(value) => this._changeled(item.id, value)}
                                value={item.trangthai}
                                backgroundActive={'#432577'}
                            >
                            </Switch>




                        </View>


                    }
                    numColumns={2}
                    keyExtractor={item => item.id}
                />
            }</View>
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
        )

    }
}
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignContent: 'center',
        justifyContent: 'center',

    },
    postTemp: {
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
        width: width * 0.6,
        marginVertical: width * 3.6 / 187.5,
        marginHorizontal: width * 0.2,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
        alignItems: 'center',
    },
    postContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        margin: 8,
        padding: width * 3.6 / 187.5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 4,
        marginRight: 30
    },
    textdevices: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    showimage: {
        borderColor: 'gray',
        borderWidth: 0.4,

        margin: 10,
        backgroundColor: '#f1f1f1',
        width: 120,
        height: 100,

    },
    btnssw: {
        margin: 30,
    },
    //
    insertContainer: {
        width: width * 167.5 / 187.5,
        alignContent: 'center',
        backgroundColor: '#fff',
        padding: width * 5 / 187.5,

    },
    inputcontainerall: {
        width: '100%',

    },
    insertRow: {
        flexDirection: 'row', alignItems: 'center',
        marginBottom: 20,
    },
    insertTextinput: {
        height: 34,
        flex: 1,
        marginRight: 4,
        borderWidth: 0.1,
        borderRadius: 5,
        backgroundColor: 'white',
        paddingLeft: 5,

    },

    pickimage: {
        borderColor: 'black',
        borderWidth: 0.5,
        marginLeft: 40,
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        width: 150,
        height: 120,

    },
    btninsert: {
        flexDirection: 'row',
        borderColor: 'white',

    },
    btnthemtb: {
        flexDirection: 'column',
        backgroundColor: '#f1f1f1',
        marginVertical: width * 3.6 / 187.5,
        marginHorizontal: width * 0.2,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
        alignItems: 'center',
        justifyContent: 'center'

    },

    textco: {
        fontSize: 22,
        textAlign: 'center'
    },
    viewback: {
        flex: 2,
        margin: 10,
        justifyContent: 'center',
        width: 50,
        // height:50,
        // backgroundColor:'gray'
    },
    viewtenroom: {
        flex: 15,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginRight: 35,
        padding: width * 3.6 / 187.5,

    },
    pickimagerom: {
        borderWidth: 0.5,
        marginHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        width: 150,
        height: 120,
    },

});



