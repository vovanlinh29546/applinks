import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Image, Dimensions } from 'react-native'
import logo from '../images/logo.png';
import {
getCheckFirstTime
} from "./auth";
export default class Splash extends Component {
    constructor(props) {
        super(props)
        // setTimeout(() => {
        //     this.props.navigation.navigate('Hướng dẫn')
        // }, 3000);

    }
    state = {
        animatedValue: new Animated.Value(0),
        animatedYValue: new Animated.Value(-200),

    }

    componentDidMount = async()=> {
        this._fadeAnimation()
        this._TransitionAnimation()
        try {
             const check = await getCheckFirstTime();
            
            if(typeof check == "undefined"){
            setTimeout(() => {
            this.props.navigation.navigate('Hướng dẫn')
                            }, 2500);
            }
            else{
            setTimeout(() => {
            this.props.navigation.navigate('Đăng nhập')
                            }, 2500);

            }
        } catch (error) {
            console.log(error)
        }
       
    }

    _fadeAnimation() {
        Animated.timing(this.state.animatedValue, {
            toValue: 1,
            duration: 1400
        }).start();
    }

    _TransitionAnimation() {
        Animated.timing(this.state.animatedYValue, {
            toValue: 1,
            duration: 2000
        }).start();
    }

    render() {
        return (
            <View style={styles.container}>
                <Animated.View
                    style={[styles.image, {
                        opacity: this.state.animatedValue,
                        top: this.state.animatedYValue,
                        // position : 'absolute'
                    }]}
                >
                    <Image style={styles.image} resizeMode={'contain'} source={logo} />
                    
                </Animated.View>
                <Animated.View style={[styles.containertext,{
                        opacity: this.state.animatedValue,
                        top: this.state.animatedYValue,
                }]}>
                <Text style={styles.text} >SmartLinks</Text>
                </Animated.View>
            </View>
        )
    }
}
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign:'center',
        backgroundColor:'white',
    },
    containertext: {
        alignItems: 'center',
        justifyContent: 'center',


    },
    image: {
        width: width * 0.5,
        height: height * 0.5
    },
    text: {
    color:'black',
    fontSize:30,
    fontWeight:'bold'
    }
})
