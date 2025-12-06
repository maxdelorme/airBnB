import { Image, StyleSheet, View, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../assets/css/colors";

const size = 150;

const Avatar = ({ src, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      {src ? (
        <Image
          source={{ uri: src }}
          style={styles.avatar}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.avatar}>
          <FontAwesome name="user" size={size * 0.8} style={styles.icons} />
        </View>
      )}
    </Pressable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderColor: colors.primary,
    borderWidth: 1,
    borderStyle: "solid",
    width: size,
    height: size,
    borderRadius: 250,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    color: colors.lightgrey,
  },
});
