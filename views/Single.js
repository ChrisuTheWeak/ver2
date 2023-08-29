import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, SafeAreaView, Text, Image} from 'react-native';
import { mediaUrl } from '../utils/app-config';


const Single = ({route,navigation}) => {
  const singleMedia = route.params;

  return (
    <SafeAreaView style={styles1.container}>
      <Image
        style={styles1.image}
        source={{uri: mediaUrl + singleMedia.thumbnails.w160}}
      />
      <Text>{singleMedia.title}</Text>
      <Text style={styles1.desc}>{singleMedia.description}</Text>
      <Text style={styles1.data}>ID: {singleMedia.file_id}{"\n"}
       Posted By: {singleMedia.user_id}{"\n"}
       Time: {singleMedia.time_added}</Text>


    </SafeAreaView>
  );
};

const styles1 = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'top',
    paddingTop: 40,
  }, image:{
    width: '100%',
    paddingTop: '10',
    resizeMode:'contain',
    height: '70%',
    margin: 5,
    borderRadius: 15,
  },
  desc:{
    margin:30,
    padding:1,
    color:'green',
  },
  data:{
    fontSize:10,
    backgroundColor:'lightgreen',
  }


});
Single.propTypes ={
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Single;
