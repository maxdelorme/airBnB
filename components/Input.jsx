import { TextInput, StyleSheet, View, Text } from "react-native";
import colors from "../assets/css/colors";
const Input = (props) => {
  return (
    <View style={styles.wrapper}>
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
      {props.errors && props.errors.length ? (
        <View>
          {props.errors.map((elem, index) => {
            return (
              <Text key={index} style={styles.error}>
                • {elem}
              </Text>
            );
          })}
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    borderStyle: "solid",
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
  error: {
    color: colors.alert,
    fontSize: 10,
  },
});
