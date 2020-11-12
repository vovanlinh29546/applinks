import * as firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDu25T9Md0e4SXeW3NA0lHHhVdAB3jPPfk",
    authDomain: "linhreactbeginer.firebaseapp.com",
    databaseURL: "https://linhreactbeginer.firebaseio.com",
    projectId: "linhreactbeginer",
    storageBucket: "linhreactbeginer.appspot.com",
    messagingSenderId: "834546285506",
    appId: "1:834546285506:web:58ebbf4b57befe9ae1b45b",
    measurementId: "G-KR3NQXJ8J5"
  };
  export default firebaseConfig=firebase.initializeApp(config);
  var storage = firebase.storage();