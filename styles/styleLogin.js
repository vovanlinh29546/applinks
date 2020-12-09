import { StyleSheet } from 'react-native';
import {Dimensions, } from 'react-native';
const { width: WIDTH } = Dimensions.get('window');
const { height: HEIGHT } = Dimensions.get('window')
export default StyleSheet.create({
    backgroundcontainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        width:WIDTH,


      },
      logocontainer: {
    alignItems: 'center',
    marginTop: 20,
      },
    
      logo: {
    marginTop:40,
    width: WIDTH * 0.4,
    height: HEIGHT * 0.2,
    
      },
      logotext: {
        fontSize: 24,
            fontWeight: 'bold',
        marginTop: 10,

        marginBottom: 10,
      },
      input: {
    width: WIDTH *0.85,
    height: 45,
    borderRadius: 15,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    color: 'black',
    marginHorizontal: 25,
    borderColor: 'black',
    borderWidth: 0.5,
        
      },
      inputcontainer: {
        marginTop: 10,
        alignItems: 'center',
      },
      inputcontainerall:{
        width: '100%',
        alignItems: 'center',
      },
      btnlogin: {
        marginTop: 10,
        width: WIDTH *0.5,
        height: 45,
        borderRadius: 15,
        backgroundColor: '#432577',
        justifyContent: 'center',
        alignContent:'center',
        alignItems:'center',
        borderColor: 'white',
        borderWidth: 0.5,
        marginLeft: 22,
     
      },
      textlogin: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    
      },
      textregis: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
      },
      inputicon: {
        position: 'absolute',
        top: 8,
        left: 37,
      },
      btneye: {
        position: 'absolute',
        right: 37,
      top:8,
      },
  });
  