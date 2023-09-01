import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication, useUser } from '../hook/apiHooks';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try{
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(token);
      console.log ('userdata',userData);
      if (userData){
        setIsLoggedIn(true);
      }
    }catch (error){
      console.log('Check Token:Login.js',error);
    }
  }

  useEffect (() => {
    checkToken();
  },[]);
  const logIn = async () => {
      console.log('Button pressed');
      try{
      const loginResponse = await postLogin({
        username:'Chrisu',
        password:'pokale',
      });
      console.log('postLogin', loginResponse);
      await AsyncStorage.setItem('userToken', loginResponse.token);
      setIsLoggedIn(true);
    }catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object, Login: PropTypes.object,
};

export default Login;
