import React, { Component } from 'react'
import {Button,TouchableOpacity,Dimensions,Text,View,SafeAreaView,Image  } from 'react-native';
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { DrawerActions } from '@react-navigation/native';



    export default class CustomHeader extends Component {
    constructor(props) {
        super(props)

    }
    

    render() {
        let {title,navigation,ishome,setting}=this.props
        return (
            <View style={{
        backgroundColor: '#444444',
         flexDirection:'row',
                 alignItems: 'center',
                  height:50

    }}>
    {ishome?(
        null

    ):
    (<View style={{flex:1,paddingHorizontal:10,}}>
    <TouchableOpacity style={{
        
      }}
       onPress={() => {
          navigation.goBack();
       }}
       >
           <MaterialIcons name={'arrow-back'} size={25} color={ 'white'}/>
       </TouchableOpacity>

    </View>)
    }
    
    <View style={{flex:5}}>
    <Text  style={{fontSize:25,color:'#fff',
        paddingHorizontal:ishome?20:0,
                    fontWeight:'bold'}}>{title}</Text>
    </View>
    
{setting?
(
    <View style={{flex:2,

    }}>
    <TouchableOpacity style={{
         
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        
      }}
       onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
       }}
       >
              <AntDesign name={'setting'} size={35} color={ 'white'}/>
    </TouchableOpacity>
    </View>
):
(null)
}

    </View>
        )
    }
}
const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')
