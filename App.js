import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';
import { Aperture } from 'react-native-feather';


const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Aperture style={styles.icon}/>
        <List />
      </SafeAreaView>
      <StatusBar style="auto" />
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

export default App;
