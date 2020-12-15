
import React, { useState,useRef  } from 'react';
import { StyleSheet, Text, View, Button,Image,Dimensions,TouchableOpacity,Alert } from 'react-native';
//scroll horizon
import Swiper from 'react-native-swiper';
//khai bao imga hướng dẫn
import image1 from '../images/tutor/linkall.png';
import image2 from '../images/tutor/customize.png';
import image3 from '../images/tutor/automation.png';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
setCheckFirstTime
} from "./auth";
export default function App({ navigation, route }) {
     const swiper = React.useRef(null);
	const [data, setdata] = useState([
            {
                image: image1,
                title:"Kết nối",
                info:"Kết nối các thiết bị thông minh vào ngôi nhà của bạn và điều khiển chúng",
            },
            {
                 image: image2,
             title:"Tùy Chỉnh",
               info:"Nhanh chóng và tối ưu các thiết bị",
            },
            {
                image: image3,
           title:"Tự động",
             info:"Tự động hóa các thiết bị khi có tác động từ môi trường",
            },


          
        ]
        );
const [showskip, setshowskip] = useState(false);
const [changeindex, setchangeindex] = useState(0);
    const handleNext = () => {
        if(swiper && swiper.current) {
           swiper.current.scrollBy(1);
        }
    }
    const handlePrevious = () => {
        if(swiper && swiper.current) {
           swiper.current.scrollBy(-1);
        }
    }
 const  setCheck = async() => {

setCheckFirstTime("checked");
navigation.navigate('Đăng nhập');
  }
   const  setLogin= async() => {
             Alert.alert("Cảnh báo!", "Bạn có chắc muốn bỏ qua hướng dẫn?", [
              { text: "Hủy", onPress: () => null },
            {
                text: "Đồng ý",
                onPress: () => setCheck()
               
            }

        ]);

  }
	return (
		<View style={styles.container}>
			
                <Swiper  
                index={0}
                    loop={false}
              ref={swiper}
                    style={{
                    }}
          onIndexChanged={(index) => {
            console.log('index >>> ', index);
            setchangeindex(index);
          }}

                 >
          {
            data.map((item, i) =>
            <View 
                                style={{
                                flex:1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignContent: 'center'
                    }}>
      <Image source={item.image} style={styles.stimage} />
      <Text style={{
        		textAlign: 'center',
		      color: '#333333',
        fontSize: 25,
        fontWeight:'bold'
        }
      }>{item.title}</Text>
      <Text
      
       style={{
        		textAlign: 'center',
		      color: '#333333',
        fontSize: 20,
        width:width*0.8
        }
      }>{item.info}</Text>
                {changeindex ==2  ?
      ( 
         <TouchableOpacity style={{
        		justifyContent: 'center',
		alignItems: 'center',
          bottom:60,
          position:'absolute',
            width: width *0.5,
    height: 45,
    borderRadius: 20,
    backgroundColor: '#4D128D',
    borderColor: 'white',
    borderWidth: 1,
      }}
       onPress={() => {setCheck()}}
       >

                      <Text style={{
                     color: '#F8F8FF',
                     fontSize: 18,
                     textAlign: 'center',
                     fontWeight:'bold'
           }}>BẮT ĐẦU</Text>
    </TouchableOpacity>
      ):
      (<TouchableOpacity style={{
        		justifyContent: 'center',
		alignItems: 'center',
          bottom:60,
          position:'absolute',
            width: width *0.5,
    height: 45,
    borderRadius: 20,
    backgroundColor: '#4D128D',
    borderColor: 'white',
    borderWidth: 1,
      }}
       onPress={() => {handleNext()}}
       >

                      <Text style={{
                     color: '#F8F8FF',
                     fontSize: 18,
                     textAlign: 'center',
                     fontWeight:'bold'
           }}>TIẾP TỤC</Text>
    </TouchableOpacity> )
        }

{changeindex >=1?
(
  <TouchableOpacity style={{
          left:0,
          top:0,
          position:'absolute',
           paddingHorizontal: 10,
            paddingVertical: 10,
          
      }}
       onPress={() => {handlePrevious()}}
       >
  <MaterialIcons name={ 'arrow-back'} size={26} color={'gray'} />
    </TouchableOpacity>
)
:
(null)}
       
            </View>
            )
          }
        </Swiper>


    

        <View style={{
          position: 'absolute', 
          top: 0, right: 0,
           paddingHorizontal: 10,
            paddingVertical: 10,

      }}>
       <TouchableOpacity style={{
         flexDirection:'row',
          height:30,
          
      }}
       onPress={() => {setLogin()}}
       >

          <Text style={{
             fontSize: 20,
             color:'rgba(52, 52, 52, 0.4)'
           }}>Đăng nhập</Text>
    </TouchableOpacity>
      </View>


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
    backgroundColor:'white',
	},
	stimage: {
alignSelf: 'center',
width:width*0.7,
height:height*0.4,

	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5
	},
    inputcontainer: {
          position: 'absolute', 
          paddingHorizontal: 10,
          paddingVertical: 10,
          bottom:40
  },
    btnlogin: {
    marginTop: 10,

    width: width *0.5,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#4D128D',
    borderColor: 'white',
    borderWidth: 0.5,
		justifyContent: 'center',
		alignItems: 'center',
  },
});