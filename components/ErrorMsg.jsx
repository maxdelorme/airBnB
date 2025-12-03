import { Text, StyleSheet } from "react-native";
import colors from "../assets/css/colors";

const ErrorMsg = ({ error }) => {
  return error && <Text style={styles.error}>{error}</Text>;
};

export default ErrorMsg;

const styles = StyleSheet.create({
  error: {
    color: colors.primary,
  },
});
