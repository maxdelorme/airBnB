import { View, StyleSheet } from "react-native";
import colors from "../assets/css/colors";

const Separator = () => {
  return <View style={styles.separator} />;
};

export default Separator;

const styles = StyleSheet.create({
  separator: {
    borderColor: colors.lightgrey,
    borderStyle: "solid",
    borderWidth: 1,
    width: "100%",
    height: 1,
    marginBlock: 20,
  },
});
