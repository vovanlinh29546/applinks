import { AsyncStorage } from "react-native";
//import decode from 'jwt-decode'

export const USER_KEY = "auth-key";
export const USER_INFO = "user-info";
export const USER_NAME = "user_name";
export const USER_PASSWORD = "user_password";
export const IS_REMEMBERED = "is_remembered";


import { cloneDeep as _cloneDeep } from 'lodash';

// export const setToken = (token) => AsyncStorage.setItem(USER_KEY, token);
export const setToken = async ({ user, token }) => {
  try {
    await AsyncStorage.setItem(USER_KEY, token);
    const userInfo = decodeToken(token)
    await AsyncStorage.setItem(USER_INFO, JSON.stringify(user));
  } catch (error) {
    //
  }
};

// const decodeToken = (token) => {
//   try {
//     return decode(token)
//   } catch (error) {
//     return null
//   }
// }
const getTokenExpirationDate = (token) => {
  const decodedToken = decodeToken(token)
  if (!decodedToken) { return null }

  const date = new Date(0)
  date.setUTCSeconds(decodedToken.exp)
  return date
}
const isTokenExpired = (token) => {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
// export const onSignOut = () => AsyncStorage.multiRemove([USER_KEY,TERNANT]);
export const onSignOut = async() => {
  try {
    //await AsyncStorage.clear();
    await AsyncStorage.removeItem(USER_KEY);
    await AsyncStorage.removeItem(USER_INFO);
  } catch (error) {
    //
  }
};

export const isSignedIn = async () => {
  try {
    const token = await AsyncStorage.getItem(USER_KEY)
    if(token) {
      return true
    }
  } catch (error) {
    return false
  }
}
// export const getToken = () => AsyncStorage.getItem(USER_KEY);
export const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem(USER_KEY);
    if (token && !isTokenExpired(token)) {
      return token
    }
    return null
  } catch (error) {
    return null;
  }
};

export const getUserInfo = async () => {
  try {
    const token = await AsyncStorage.getItem(USER_KEY);
    if (token && !isTokenExpired(token)) {
      const userInfo = await AsyncStorage.getItem(USER_INFO);
      return JSON.parse(userInfo)
    }
    return null
  } catch (error) {
    return null;
  }
};

export const setIsRemembered = async () => {
  try {
    let remember = await AsyncStorage.setItem(IS_REMEMBERED, 'yes');
    if (remember) {
      console.log("savedRmb",remember);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getIsRemembered = async () => {   
  try {     
    const value = await AsyncStorage.getItem(IS_REMEMBERED); 
    if (value !== null) {       
      return value;    
    }   
  } 
  catch (error) {   
    console.log(error);
  }
};

export const setUserName = async (userName) => {
  try {
    let usename = await AsyncStorage.setItem(USER_NAME, userName);
    if (usename) {
      console.log("savedUser",usename);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getUserName = async () => {   
  try {     
    const value = await AsyncStorage.getItem(USER_NAME); 
    
    if (value !== null) {       
      return value;    
    }   
  } 
  catch (error) {   
    console.log(error);
  }
};

export const setUserPassWord = async (userPassWord) => {
  try {
    await AsyncStorage.setItem(USER_PASSWORD, userPassWord);
  } catch (error) {
    console.log(error);
  }
};

export const getUserPassWord = async () => {   
  try {     
    const value = await AsyncStorage.getItem(USER_PASSWORD); 

    if (value !== null) {       
      return value
    }   
  } 
  catch (error) {   
    console.log(error);
  }
};

export const removeRememberMe = async() => {
  try {
    //await AsyncStorage.clear();
    await AsyncStorage.removeItem(USER_NAME);
    await AsyncStorage.removeItem(USER_PASSWORD);
    await AsyncStorage.removeItem(IS_REMEMBERED);
  } catch (error) {
    //
  }
};



