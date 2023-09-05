import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';
import {Button, Card, ListItem as RNEListItem} from '@rneui/themed';




const ListItem = ({singleMedia, navigation}) => {
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
      </RNEListItem>

    </TouchableOpacity>

  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const styles = StyleSheet.create({
  item:{
    backgroundColor: 'lightblue',
    flexDirection: 'row',
    justifyContent:'right',
    marginBottom:5,
    height:120,
  },
  image:{
    width: 125,
    height: '120',
    margin: 5,
    borderRadius: 15,
  },
   title:{
    fontWeight:'bold',
    margin: 10,
    padding:10,
  },
  desc:{
    margin:30,
    padding:1,
    color:'green',

  },

});

export default ListItem;
