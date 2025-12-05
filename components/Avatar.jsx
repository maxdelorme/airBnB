import { Image, StyleSheet, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "../assets/css/colors";

const size = 150;

const Avatar = ({ src, height = 150 }) => {
  return src ? (
    <View style={styles.avatar}>
      <Image source={src} style={styles.avatar} resizeMode="contain" />
    </View>
  ) : (
    <View style={styles.avatar}>
      <FontAwesome name="user" size={size * 0.8} style={styles.icons} />
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  avatar: {
    borderColor: colors.primary,
    borderWidth: 3,
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
