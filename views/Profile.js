import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTag } from '../hook/apiHooks';
import { mediaUrl } from '../utils/app-config';


const Profile = () => {
const [avatar, setAvatar] = useState ('');
const {getFilesByTag} = useTag();
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
  const loadAvatar = async () => {
    try{
    const avatars = await getFilesByTag('avatar_'+ user.user_id);
    console.log('Avatar',avatars)
    setAvatar(mediaUrl + avatars.pop().filename);
  }catch (error){
      console.error(error);
    };
  };
  useEffect (()=>{
    loadAvatar();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>{user.username}</Text>
      <Image style={styles.Image} source={{uri: avatar}}/>
      <Text>{user.email}</Text>
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
  },Image:{
    width:300,
    height:300,
  }
});

export default Profile;
