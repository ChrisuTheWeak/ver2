import React, { useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';

const Login = ({navigation}) => { // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const logIn = () => {
      console.log('Button pressed');
      setIsLoggedIn(true);
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
