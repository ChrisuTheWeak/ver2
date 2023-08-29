import {Image, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {mediaUrl} from '../utils/app-config';


const ListItem = ({singleMedia, navigation}) => {
  return (
    <TouchableOpacity style={styles.item}
      onPress={() => {
        console.log('touched!', singleMedia.title);
        navigation.navigate('Single',singleMedia);
      }}
    >
      <Image
        style={styles.image}
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <Text style={styles.title}>{singleMedia.title}</Text>
      <Text style={styles.desc}>{singleMedia.description}</Text>
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
