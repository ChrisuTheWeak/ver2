import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import Listitem from './Listitem';
import { useEffect, useState } from 'react';
import { apiUrl } from '../Utils/app-config';


const url = 'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';


const List = () => {
  const [mediaArray, setMediaArray] = useState([]);

const loadMedia = async () =>{
  try {
  const response = await fetch(apiUrl + 'media');
  const json = await response.json();
      //console.log(json);
  const imageFile = await Promise.all(
    json.map(async(item)=> {
    const response = await fetch(apiUrl +'media/'+ item.file_id);
    const fileData = await response.json();
    // toimii- console.log('filedata',fileData);
    return fileData;
    }));

  setMediaArray(imageFile);
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
