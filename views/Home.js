import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';
import { Aperture } from 'react-native-feather';
import { SafeAreaView, StyleSheet } from 'react-native';

const Home = ({navigation}) => {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <Aperture style={styles.icon}/>
    <List navigation={navigation}/>
  </SafeAreaView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 0,

  },icon:{
    color:'black',
  }
});
Home.propTypes = {
 navigation: PropTypes.object,
};


export default Home;
