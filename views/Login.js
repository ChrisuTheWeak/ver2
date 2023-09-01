import React, { useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication, useUser } from '../hook/apiHooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn,setUser} = useContext(MainContext);
  const {postLogin} = useAuthentication();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    try{
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserByToken(token);
      console.log ('userdata',userData);
      if (userData){
        setIsLoggedIn(true);
        setUser(userData);
      }
    }catch (error){
      console.log('Check Token:Login.js',error);
    }
  }

  useEffect (() => {
    checkToken();
  },[]);

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <LoginForm />
      <RegisterForm/>
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
