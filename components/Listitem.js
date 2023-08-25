
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import PropTypes from 'prop-types';

const Listitem = ({singleMedia}) =>{
return (
  <TouchableOpacity
  onPress={()=>{
    console.log('Touched!', singleMedia.title);
  }
  }>
  <Image
    style={{width: 100, height: 100}}
    source={{uri: singleMedia.thumbnails.w160}}
  />
  <View>
    <Text>{singleMedia.title}</Text>
    <Text>{singleMedia.description}</Text>
  </View>
</TouchableOpacity>
)
}

Listitem.propTypes = {
  singleMedia: PropTypes.object,
}
export default Listitem;
