import {StyleSheet, Text, View, FlatList, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import List from './components/List';





const App = () => {
 return (
  <>
       <SafeAreaView style={styles.container}>
         <List />
       </SafeAreaView>
       <StatusBar style="auto"/>
     </>
 );
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#fff',
   alignItems: 'center',
   justifyContent: 'center',
 },
});

export default App;
