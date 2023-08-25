import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Listitem from './Listitem';
import { useState } from 'react';



const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';


const loadMedia = async () =>{
  try {
  const response = await fetch(url);
  const json = await response.json();
  //console.log(json);
  return json;
}catch (error){
    console.error('loadMedia Failed', error)
  }
};


const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const data = loadMedia();
  setMediaArray(data);
  return (
  <FlatList
       data={mediaArray}
       renderItem={({item}) => <Listitem singleMedia={item} />}
     />
  );
};

export default List;
