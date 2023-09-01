import React, { useContext } from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import { MainContext } from '../contexts/MainContext';

const Profile = () => {
  const {setIsLoggedIn} = useContext (MainContext);
  const logOut = () =>{
    console.log ('log out button')
    setIsLoggedIn(false);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title='Log out !!!' onPress={logOut}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
