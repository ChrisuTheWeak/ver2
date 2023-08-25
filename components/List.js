import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Listitem from './Listitem';
import { useEffect, useState } from 'react';



const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';


const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

const loadMedia = async () =>{
  try {
  const response = await fetch(url);
  const json = await response.json();
  //console.log(json);
  setMediaArray(json);
}catch (error){
    console.error('loadMedia Failed', error)
  }
};
  useEffect( () => {
    loadMedia();
  }, [] );

  return (
  <FlatList
       data={mediaArray}
       renderItem={({item}) => <Listitem singleMedia={item} />}
     />
  );
};

export default List;
