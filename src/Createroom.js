
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image,Dimensions,TouchableOpacity } from 'react-native';
//scroll horizon
import Swiper from 'react-native-swiper';
//khai bao imga hướng dẫn
//custom
import CustomHeader from "./CustomHeader.js";
export default function App({ navigation, route }) {

	return (
		<View style={styles.container}>
		<CustomHeader title="Thêm phòng" navigation={navigation} ishome={false} setting={false}/>
			<Text> tạo phòng</Text>
		</View>
	);
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
	stimage: {
width:width,
height:height
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});