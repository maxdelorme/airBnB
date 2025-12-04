import { Text, Image, View, StyleSheet } from "react-native";
import colors from "../../assets/css/colors";

const RoomPict = ({ room }) => {
  const { photos, price } = room;
  return (
    <View>
      <Image src={photos[0].url} style={styles.image}></Image>
      <Text style={styles.price}>{price} €</Text>
    </View>
  );
};

export default RoomPict;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  price: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    paddingBlock: 10,
    paddingInline: 20,
  },
});
