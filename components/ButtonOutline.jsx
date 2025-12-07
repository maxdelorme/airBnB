import { Pressable, Text, StyleSheet } from "react-native";
import colors from "../assets/css/colors";

const ButtonOutline = ({ onPress, children, variant }) => {
  return (
    <Pressable style={[styles.btnOutline, styles[variant]]} onPress={onPress}>
      <Text style={[styles.label, styles["label-" + variant]]}>{children}</Text>
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
  fill: {
    backgroundColor: colors.primary,
  },
  label: {
    fontSize: 18,
    color: colors.grey,
  },
  "label-fill": {
    color: "white",
  },
  "label-disabled": {
    color: colors.lightgrey,
  },
});
