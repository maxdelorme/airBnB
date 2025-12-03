import { View, StyleSheet } from "react-native";
const Wrapper = (props) => {
  return <View style={styles.wrapper}>{props.children}</View>;
};

export default Wrapper;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    gap: 15,
  },
});
