import React, { useContext, useEffect, useState } from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTag } from '../hook/apiHooks';
import { mediaUrl } from '../utils/app-config';
import { Card, Icon, ListItem, } from '@rneui/themed';



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
  <Card>
      <Text>Profile</Text>
      <Card.Title>{user.username}</Card.Title>

      <Card.Divider/>

      <Card.Image source={{uri: avatar}}/>

      <ListItem>
        <ListItem.Title>{user.email}</ListItem.Title>
        </ListItem>

        <ListItem>
          <Icon name='person'></Icon>
        <ListItem.Title>{user.username}</ListItem.Title>
        </ListItem>

        {user.full_name &&(
           <ListItem>
           <Icon name='person'></Icon>
         <ListItem.Title>{user.full_name}</ListItem.Title>
         </ListItem>
        )}

        <ListItem>
          <Icon name=''></Icon>
        <ListItem.Title>ID: {user.user_id}</ListItem.Title>
        </ListItem>

      <Button  title='Log out !!!' onPress={logOut}/>
  </Card>
  );
};



export default Profile;
