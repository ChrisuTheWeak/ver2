import {Image, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, ListItem as RNEListItem} from '@rneui/themed';
import { useMedia } from '../hook/apiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';




const ListItem = ({singleMedia, navigation, userId}) => {
  const {deleteMedia} = useMedia();
  const {update, setUpdate} = useContext(MainContext);

  const deleteFile = async () => {
    Alert.alert('Delete', `file id: ${singleMedia.file_id}, Are your sure?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: async () => {
          console.log('deleting file', singleMedia.file_id);
          try {
            const token = await AsyncStorage.getItem('userToken');
            // TODO: use useMedia hook to delete files:
          const result = await deleteMedia(singleMedia.file_id, token);
          console.log('delete file', result.message);
          setUpdate(!update);
          } catch (error) {
            console.error(error);
          }
        },
      },
    ]);
  };

  const modifyFile = async () => {
    console.log('modifying file', singleMedia.file_id);
    navigation.navigate('Modify',singleMedia);
  };



  return (

    <TouchableOpacity
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single',singleMedia);
      }}
    >

      <Card.Image
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <RNEListItem>
      <RNEListItem.Title>{singleMedia.title}</RNEListItem.Title>
      <RNEListItem.Subtitle>{singleMedia.description}</RNEListItem.Subtitle>
      {singleMedia.user_id == userId &&(
      <>
      <Button size='sm' onPress={modifyFile} >Modify</Button>
      <Button size='sm' onPress=
        {deleteFile} color={'error'}
        >Delete</Button>
      </>)}
      </RNEListItem>
      <RNEListItem.Chevron />

    </TouchableOpacity>

  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
  userId: PropTypes.number,
};



export default ListItem;
