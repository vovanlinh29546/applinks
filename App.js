// import React, { Component } from "react"
// import { StyleSheet, Text, View } from 'react-native'
// export default class App extends Component {
//     render() {
//         return (
//             <View style={styles.container}>
//                 <Text style={styles.tittle}>
//                     Test demo app
//                 </Text>
//             </View>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     },
//     tittle: {
//         fontWeight: 'bold',
//         fontSize: 17,
//         color: 'black'
//     }
// })
import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {
	const [count, setCount] = useState(0);

	return (
		<View style={styles.container}>
			<Text>You clicked {count} times.</Text>
			<Button
				onPress={() => setCount(count + 1)}
				title="Click me"
				color="red"
				accessibilityLabel="Click this button to increase count"
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	}
});