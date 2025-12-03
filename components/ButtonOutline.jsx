import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../assets/css/colors";

const ButtonOutline = ({ onPress, children }) => {
  return (
    <Pressable style={styles.btnOutline} onPress={onPress}>
      <Text style={styles.label}>{children}</Text>
    </Pressable>
  );
};

export default ButtonOutline;

const styles = StyleSheet.create({
  btnOutline: {
    borderColor: colors.primary,
    borderStyle: "solid",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
    height: 50,
    borderRadius: 40,
  },
  label: {
    fontSize: 18,
    color: colors.grey,
  },
});
