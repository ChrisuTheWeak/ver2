import React, { useContext } from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Profile = () => {
  const {setIsLoggedIn, user} = useContext (MainContext);
  console.log('profile',user);
  const logOut = async () =>{
    console.log ('log out button')
    try {
      await AsyncStorage.clear();
      setIsLoggedIn(false);
    }catch (error){
      console.error(error);
    }


  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Button title='Log out !!!' onPress={logOut}/>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
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
