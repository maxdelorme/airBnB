import { TextInput, StyleSheet } from "react-native";
import colors from "../assets/css/colors";
const Input = (props) => {
  return (
    <TextInput
      autoCapitalize="none"
      {...props}
      style={[
        props.isTextarea ? styles.textArea : styles.input,
        props.hasError && styles.inputError,
      ]}
      multiline={props.isTextarea}
      textAlignVertical="top"
    ></TextInput>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    borderStyle: "solid",
    width: "100%",
    padding: 10,
    height: 45,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderStyle: "solid",
    paddingBottom: 10,
    width: "100%",
    height: 100,
  },
  inputError: {
    backgroundColor: "lightyellow",
  },
});
