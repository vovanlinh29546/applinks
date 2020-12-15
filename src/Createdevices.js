
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button,Image,Dimensions,TouchableOpacity } from 'react-native';
//scroll horizon
import Swiper from 'react-native-swiper';
//khai bao imga hướng dẫn

export default function App({ navigation, route }) {

	return (
		<View style={styles.container}>
			<Text> tạo thiết bị</Text>
		</View>
	);
}
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
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