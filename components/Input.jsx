import { TextInput, StyleSheet, View, Text, Pressable } from "react-native";
import colors from "../assets/css/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

const inputHeight = 45;
const iconHeight = 16;

const Input = (props) => {
  const {
    type,
    hasError,
    errors,
    enterKeyHint,
    multiline,
    onEndEditing,
    isTextarea,
  } = props;

  const [isVisible, setIsVisible] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const isSecure = type === "password";

  return (
    <View style={styles.wrapper}>
      <TextInput
        autoCapitalize="none"
        style={[
          styles.input,
          multiline && styles.textArea,
          hasError && styles.inputError,
          isFocus && styles.isFocus,
        ]}
        multiline={isTextarea}
        textAlignVertical="top"
        secureTextEntry={isSecure && !isVisible}
        enterKeyHint={enterKeyHint || "default"}
        onEndEditing={onEndEditing}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...props}
      ></TextInput>

      {isSecure && (
        <Pressable
          onPressIn={() => {
            setIsVisible(true);
          }}
          onPressOut={() => {
            setIsVisible(false);
          }}
          style={styles.pressableOverlay}
        >
          <FontAwesome5
            name={!isVisible ? "eye-slash" : "eye"}
            size={iconHeight}
            id="eyeIcon"
            style={styles.iconOverlay}
          />
        </Pressable>
      )}

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
    height: inputHeight,
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
  pressableOverlay: {
    position: "absolute",
    right: 10,
    top: (inputHeight - iconHeight) / 2,
  },
  iconOverlay: {
    color: colors.lightgrey,
  },
  isFocus: {
    outlineColor: colors.primary,
    outlineStyle: "solid",
    outlineWidth: 1,
    outlineOffset: 0,
    borderRadius: 5,
    borderColor: "transparent",
  },
});
