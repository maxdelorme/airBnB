import { TextInput, StyleSheet, View, Text } from "react-native";
import colors from "../assets/css/colors";
const Input = (props) => {
  const {
    type,
    hasError,
    errors,
    enterKeyHint,
    multiline,
    onBlur,
    isTextarea,
  } = props;
  return (
    <View style={styles.wrapper}>
      <TextInput
        autoCapitalize="none"
        style={[
          styles.input,
          multiline && styles.textArea,
          hasError && styles.inputError,
        ]}
        multiline={isTextarea}
        textAlignVertical="top"
        {...props}
      ></TextInput>

      {errors && errors.length ? (
        <View>
          {errors.map((elem, index) => {
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
    borderColor: colors.primary,
    borderStyle: "solid",
    padding: 10,
    height: 45,
  },
  textArea: {
    borderWidth: 1,
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
