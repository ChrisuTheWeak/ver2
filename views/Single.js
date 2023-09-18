import React, {useContext, useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {formatDate} from '../utils/func';
import {Card, Icon, Text, ListItem, Button} from '@rneui/themed';
import {Video} from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userID , useFavourite} from '../hook/apiHooks';
import { MainContext } from '../contexts/MainContext';
import * as ScreenOrientation from 'expo-screen-orientation';
import { ScrollView } from 'react-native';

const Single = ({route, navigation}) => {
  const [owner, setOwner] = useState({});
  const [userLike, setUserLike]= useState(false);
  const [likes, setLikes] = useState([]);
  const {user} = useContext(MainContext);
  const {getUserById} = userID();
const {postFavourite,deleteFavourite,
  getFavouritesById,getFavouritesByToken,}= useFavourite();

const videoRef = useRef (null);

  const {
    title,
    description,
    filename,
    time_added: timeAdded,
    user_id: userId,
    filesize,
    media_type: mediaType,
    file_id: fileId,
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
  //add favurite
 const createFavourite = async () =>{
  try {
    const token = await AsyncStorage.getItem ('userToken');
    const response = await postFavourite ({file_id: fileId},token,);
      response && setUserLike(true);
      console.log('like Button',response);
  } catch (error) {
    console.error(error.message);
  }
 };
 //remove favorit
 const removeFavourite = async () => {
  try {
    const token = await AsyncStorage.getItem ('userToken');
    const response = await deleteFavourite(fileId, token);
    response && setUserLike(false);
  } catch (error) {
    console.error(error.message);
  }
 };
 //get favourite
 const fetchLikes = async () =>{
  try {
    const likesData = await getFavouritesById(fileId);
    setLikes(likesData);
//chec is userid is in context user data
    likesData.forEach((like) => {
      if (like.user_id === user.user_id) {
        setUserLike(true);
      }
    });
  } catch (error) {
  console.error(error.message);
  };
 };
 //total Likes/favs. AA


//fullscreen video landscape
const unlockOrientation = async () => {
  try {
    await ScreenOrientation.unlockAsync();
  } catch (error) {
    console.error(error.message);
  }
};

const lockOrientation = async () => {
  try {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP,
    );
  } catch (error) {
    console.error(error.message);
  }
};

const showVideoInFullScreen = async ()=>{
try {
  await videoRef.current.presentFullscreenPlayer();
} catch (error) {
  console.error(error.message);
}
}
  useEffect(() => {
    unlockOrientation();
    fetchOwner();

    //video in landscape
    const orientSub = ScreenOrientation.addOrientationChangeListener(
      (event) => {
        if (event.orientationInfo.orientation > 2) {
          videoRef.current && showVideoInFullScreen();
        }
      },
    );

    return () => {
      ScreenOrientation.removeOrientationChangeListener(orientSub);
      lockOrientation();
    }
  }, []);

  useEffect(()=>{
    fetchLikes();
  }, [userLike]);

  // Show full image and metadata
  return (
    <ScrollView>
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
          ref={videoRef}
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
      <ListItem>
        {userLike ? (
          <Button onPress={removeFavourite}>NotLike</Button>
          ):(
          <Button onPress={createFavourite}>Like</Button>
            )}
            <Text>Total Likes: {likes.length}</Text>
      </ListItem>
    </Card>
    </ScrollView>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
