import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView, ScrollView,
    TextInput,
    Button, Image,
    TouchableOpacity, Alert, SafeAreaView, ActionSheetIOS, ActivityIndicator
} from 'react-native'
import { Switch } from 'react-native-switch';
import { Dimensions, } from 'react-native';
import firebase from '../firebase/firebase.js';
import ImagePicker from 'react-native-image-picker';
//import Constants from 'expo-constants';
import { request, PERMISSIONS } from 'react-native-permissions';
import Modal from 'react-native-modal'
import imgaaddpic from '../images/imgaaddpic.jpg';
import Icon from '../node_modules/react-native-vector-icons/Ionicons';
import { ProgressDialog } from 'react-native-simple-dialogs';
import iconliving from '../images/phongkhach.jpg';
export default class DevicesMan extends Component {
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
            shownhietdo: true,
            showdoam: true,
            trangthai:''
        }

        this.itemsRef = firebase.database().ref().child('controls/phongkhach');
        this.itemsnhietdo = firebase.database().ref().child('sensor/phongkhach/nhietdo');
        this.itemsdoam = firebase.database().ref().child('sensor/phongkhach/doam');
    }


    _changeled(ten, values) {

        firebase.database().ref('controls/phongkhach').child(ten).update({
            'trangthai': values,
    
    
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
                showbutton: false
            });
            this.state.post.map((item, idx) => {
                console.log(item.id)
            })

        });

    }
    listenForItemsnhietdo(itemsRef) {
        itemsRef.on('value', (snapshot) => {
            // console.log('Nhiệt độ: ', snapshot.val());
            this.setState({
                nhietdo: snapshot.val(),
                shownhietdo:false
            });

        });
    }
    listenForItemsdoam(itemsRef) {
        itemsRef.on('value', (snapshot) => {
            //    console.log('Độ ẩm: ', snapshot.val());
            this.setState({
                doam: snapshot.val(),
                showdoam:false
            });

        });
    }


    componentDidMount() {
        this.getPermissionAsync();
        this.listenForItems(this.itemsRef)
        this.listenForItemsdoam(this.itemsdoam)
        this.listenForItemsnhietdo(this.itemsnhietdo)
    }
    componentWillUnmount() {
        this.listenForItems(this.itemsRef)
        this.listenForItemsdoam(this.itemsdoam)
        this.listenForItemsnhietdo(this.itemsnhietdo)
    }

    getPermissionAsync = async () => {

        // const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // if (status !== 'granted') {
        //     alert('Sorry, we need camera roll permissions to make this work!');
        // }
        request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
            // …
        });
        request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE).then((result) => {
            // …
        });

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
                <Modal
                    animationType="slide"
                    transparent={false}
                    isVisible={this.state.modalVisible}
                    onBackButtonPress={this._hideDialog}
                    onBackdropPress={this._hideDialog}>

                    <InsertProduct />
                </Modal>
                <View style={styles.btninsert}>
                    <View style={styles.viewback}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack()
                            }}  >
               <Icon name={'ios-chevron-back'} size={50} color={'gray'}
                />
                        </TouchableOpacity>
                        

                    </View>
                    <View style={styles.viewtenroom}>
                        <Image source={
                            iconliving
                        } style={styles.pickimagerom}></Image>
                        <Text style={styles.textco}>Phòng khách</Text>
                    </View>


                </View>
                <View style={styles.postTemp}>
                    <TouchableOpacity

                        onPress={() => {
                            this._showDialog()
                        }}  >
                        <Text style={styles.textinsert}>Thêm thiết bị</Text>
                    </TouchableOpacity>


                </View>

                {this.state.shownhietdo && this.state.showdoam ?
                    <ActivityIndicator size="large" color="ff00000" /> :
                    <View style={styles.postTemp}>
                        <View style={styles.postinfoTemp}>
                        <Text>Nhiệt độ: {this.state.nhietdo}&deg;C </Text>
                        </View>
                        <View style={styles.postinfoTemp}>
                        <Text>Độ ẩm: {this.state.doam}%</Text>
                        </View>
                    </View>
                }


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

        backgroundColor: 'white',
        alignContent: 'center',
        justifyContent: 'center',

    },
    postTemp: {
        flex:1,
        flexDirection: 'row',
        backgroundColor: '#f1f1f1',
        width: null,
        marginVertical: width * 3.6 / 187.5,
        padding: width * 3.6 / 187.5,
        borderRadius: width * 3.6 / 187.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    postinfoTemp: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
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
export class InsertProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ten: '',
            trangthai: false,
            image: '0',
            showProgress: false,
        }
    }

    openProgress = (kt) => {
        this.setState({ showProgress: kt });
    }

    _chooseImage() {

        const options = {
            noData: true,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ image: response.uri });
            }
        });


    }

    async _uploadImage(uri) {
        this.setState({ isLoading: true })
        const ID = this.state.ten
        const response = await fetch(uri)
        const blob = await response.blob()

        //const ID = this.state.ten
        let ref = firebase.storage().ref().child("IMGPK" + ID)
        let uploadTask = ref.put(blob)
        uploadTask.on('state_changed',
            (snapshot) => {
                this.openProgress(true);
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, (error) => {
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

                    this._post(downloadURL, this.state.ten);
                });
            }
        )
    }

    _post = async (image1, ID) => {

        if (this.state.ten.length == 0) {
            alert("Không được để trống thông tin");
            return;
        }
        else {
            firebase.database().ref().child('controls/phongkhach').child(ID).set({
                image: image1,
                trangthai: false,

            })
                .then((user) => {
                    this.ten.clear();
                    this.openProgress(false);
                    this.setState({ image: '0' })
                    Alert.alert('Finish! ', 'Thêm thành công!', [], { cancelable: true });

                })
                .catch((error) => {
                    const { code, message } = error;
                    // For details of error codes, see the docs
                    // The message contains the default Firebase string
                    // representation of the error

                    Alert.alert('Lỗi! ', 'Vui lòng thử lại', [], { cancelable: true })

                });
        }

    }


    render() {
        return (
            <View style={styles.insertContainer}>
                <ScrollView keyboardShouldPersistTaps="handled" >
                    <KeyboardAvoidingView style={styles.inputcontainerall}

                        behavior={"padding"} enabled>

                        <View style={styles.inputcontainerall}>
                            <View style={styles.insertRow}>
                                <Text style={styles.inserttext}>ID thiết bị:</Text>
                                <TextInput
                                    style={styles.insertTextinput}
                                    returnKeyType="next"
                                    underlineColorAndroid='transparent'
                                    onChangeText={(value) => { this.setState({ ten: value }) }}
                                    ref={input => { this.ten = input }}

                                />
                            </View>
                            <View style={styles.insertRow}>

                                <Button
                                    title="Pick image"
                                    onPress={() => this._chooseImage()}
                                />

                                <Image source={
                                    this.state.image == '0' ? imgaaddpic : { uri: this.state.image }
                                } style={styles.pickimage} />

                            </View>


                            <View style={styles.btnthemtb}>
                                <TouchableOpacity
                                    onPress={() => { this._uploadImage(this.state.image) }}>
                                    <Text style={styles.textinsert}>Save</Text>
                                </TouchableOpacity>


                            </View>
                        </View>

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
        )
    }
}


