import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/func';
import {Card, Icon, Text, ListItem} from '@rneui/themed';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userID } from '../hook/apiHooks';

const Single = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const {getUserById} = userID();
  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
  } = route.params;

  // fetch owner info
  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const ownerData = await getUserById(userId, token);
      setOwner(ownerData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwner();
  }, []);

  // Show full image and metadata
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      {mediaType === 'image' ? (
        <Card.Image
          source={{uri: mediaUrl + filename}}
          resizeMode="center"
          style={{height: 300}}
        />
      ) : (
        <Video
          source={{uri: mediaUrl + filename}}
          style={{height: 300}}
          useNativeControls={true}
          shouldPlay={true}
          isLooping={true}
        />
      )}
      <ListItem>
        <Text>{description}</Text>
      </ListItem>
      <ListItem>
        <Icon name="save" />
        <Text>{Math.round(filesize / 1024)} kB</Text>
      </ListItem>
      <ListItem>
        <Icon name="today" />
        <Text>{formatDate(timeAdded)}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>username: {owner.username}</Text>
      </ListItem>
    </Card>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
