import * as React from 'react';
import {
    Switch, ScrollView, Text, View, StyleSheet, ImageBackground,
    TextInput, Dimensions, Image, TouchableOpacity, KeyboardAvoidingView,
    TouchableWithoutFeedback, Alert, SafeAreaView, BackHandler,
    ActivityIndicator
} from 'react-native';

import { ProgressDialog } from '../node_modules/react-native-simple-dialogs';
import firebaseConfig from '../firebase/firebase.js';

import GetLocation from 'react-native-get-location';
//import Geolocation from '@react-native-community/geolocation';
export default class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: "",
            daily: [],
            isLoading: true,
            tempmax: "",
            tempmin: "",
            temp: "",
            city: "Thanh pho Ho Chi Minh",
            icon: "",
            icondaily: "",
            city_display: "",
            desc: "",
            main: "",
            descdaily: "",
            maindaily: "",
            humidity: "",
            pressure: "",
            visiblity: "",
            showmor: false
        };

    }

    componentDidMount = async () => {
let geoOpti={
    enableHighAccuracy: true,
    timeout: 15000,
     maximumAge: 10000
}
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            // maximumAge: 10000
        })
            .then(async location => {
                this.fetch_weather(location.latitude,
                    location.longitude)
                    console.log("lat",location.latitude)
            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
            });

        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp()
            return true;
        });
    }
    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', function () {
            BackHandler.exitApp()
            return true;
        });
    }
    fetch_weather = async (lat, long) => {
        await fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&exclude=hourly&appid=83f569086f28301eec6d4c8089580574')
            .then((response) => response.json())
            .then((json) => {
                this.setState({
                    current: json.current,
                    icon: json.current.weather[0].icon,
                    temp: (json.current.temp - 273.15).toFixed(2) + " °C",
                    city_display: json.timezone,
                    main: json.current.weather[0].main,
                    desc: json.current.weather[0].description,
                    humidity: json.current.humidity + " %",
                    icondaily: json.daily[0].weather[0].icon,
                    tempmax: (json.daily[0].temp.max- 273.15).toFixed(2) + " °C",
                    tempmin: (json.daily[0].temp.min- 273.15).toFixed(2) + " °C",
                    maindaily: json.daily[0].weather[0].main,
                    descdaily: json.daily[0].weather[0].description
                    , daily: json.daily,

                });

                // this.setState({ humidity : json.main.humidity+" %"})
                console.log("clg", json)
            })
            .catch((error) => console.error(error))
            .finally(() => {
                this.setState({ isLoading: false });
            });
    }
    render() {

        return (
            <SafeAreaView
                style={styles.container}
            >
                {this.state.isLoading ? <ActivityIndicator size="large" color="ff00000"></ActivityIndicator> :

                    (<View>
                       <Text style={styles.Main_Weather_Text}>Hiện tại</Text>
                        <View style={styles.Weather_Box_Main}>
                            <View style={styles.Weather_Holder_View}>
                                <Image tintColor='#FFF' source={{ uri: "http://openweathermap.org/img/wn/" + this.state.icon + "@2x.png", }} style={styles.Weather_Image} />
                                <View>
                                    <Text style={styles.temprature_text}>{this.state.temp}</Text>
                                    <Text style={styles.city_text}>{this.state.city_display}</Text>
                                    <Text style={styles.city_text}>Độ ẩm : {this.state.humidity}</Text>
                                    <Text style={styles.city_text}>{this.state.desc}</Text>

                                </View>
                            </View>
                        </View>
                        <Text style={styles.Main_Weather_Text}>Dự đoán trong ngày</Text>
                        <View style={styles.Info_Box_View}>

                                <View style={styles.Info_Holder_Veiw}>
                                <Image tintColor='gray' source={{ uri: "http://openweathermap.org/img/wn/" + this.state.icondaily + "@2x.png", }} style={styles.Weather_Image} />
                                <View>
                                <Text style={styles.Main_Weather_Text}>{this.state.maindaily}</Text>
                                <Text style={styles.description_text}>{this.state.descdaily}</Text>
                                </View>
                            </View>

                        </View>

                        


                    </View>
                    )
                }

            </SafeAreaView>
        );
    }
}
const { width: WIDTH } = Dimensions.get('window')
const { height: HEIGHT } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: HEIGHT,

    },
    Search_view: {
        height: "20%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    Search_Box: {
        height: "35%",
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 15,
        color: "black",
        paddingHorizontal: 10
    },
    button_touch: {
        marginLeft: "5%",
        height: "35%",
        width: "8%",
        justifyContent: "center",
        alignItems: "center"
    },
    Weather_Box_Main: {
        height: "40%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",

    },
    Weather_Holder_View: {
        height: "80%",
        width: "90%",
        // backgroundColor: 'rgba(255, 255, 255, 0.3)',
        backgroundColor: 'gray',
        borderRadius: 15,
        alignItems: "center",
        flexDirection: "row"
    },
    Weather_Image: {
        height: "80%",
        width: "40%"
    },
    temprature_text: {
        fontSize: 30,
        color: "#FFF",
        marginLeft: "5%"
    },
    city_text: {
        fontSize: 20,
        color: "#FFF",
        marginLeft: "5%",
        marginTop: "3%"
    },
    Info_Box_View: {
        height: "30%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    Info_Holder_Veiw: {
        height: "80%",
        width: "90%",
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        borderRadius: 15,
        borderColor: 'black',
        alignItems: "center",
        flexDirection: "row"
    },
    Main_Weather_Text: {
        fontSize: 28,
        color: "#464646",
        marginLeft: "8%",
        marginTop: "8%",
        fontWeight: "bold"
    },
    description_text: {
        fontSize: 20,
        color: "#121212",
        marginLeft: "8%",
        marginTop: "3%"
    },
    humidity_text: {
        fontSize: 18,
        color: "#121212",
        marginLeft: "8%",
        marginTop: "5%"
    },
    other_text: {
        fontSize: 18,
        color: "#121212",
        marginLeft: "8%",
        marginTop: "2%"
    }
});