import { FlatList } from "react-native";
import ListItem from "./ListItem";
import { useMedia } from "../hook/apiHooks";

const List = () => {
  const { mediaArray } = useMedia();

  return (
    <FlatList
      data={mediaArray}
      renderItem={({ item }) => <ListItem singleMedia={item} />}
    />
  );
};

export default List;
