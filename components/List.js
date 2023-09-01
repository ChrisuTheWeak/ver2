import { FlatList } from "react-native";
import ListItem from "./Listitem";
import { useMedia } from "../hook/apiHooks";
import  PropTypes  from "prop-types";

const List = ({navigation}) => {
  const { mediaArray } = useMedia();

  return (
    <FlatList
      data={mediaArray}
      renderItem={({ item }) => <ListItem singleMedia={item} navigation={navigation} />}
    />
  );
};
List.propTypes = {
  navigation: PropTypes.object,
 };
export default List;
