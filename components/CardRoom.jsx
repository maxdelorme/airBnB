import { View, StyleSheet } from "react-native";

import colors from "../assets/css/colors";
import { RoomPict, UnderImage } from "./Room";

const CardRoom = ({ room }) => {
  return (
    <View style={styles.room}>
      <RoomPict room={room} />
      <UnderImage room={room} />
    </View>
  );
};

export default CardRoom;
const styles = StyleSheet.create({
  room: { gap: 10 },
});
