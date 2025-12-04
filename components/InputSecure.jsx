import { TextInput, StyleSheet, View, Pressable } from "react-native";
import colors from "../assets/css/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

const InputSecure = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={[styles.inputContainer, props.hasError && styles.inputError]}>
      <TextInput
        style={styles.inputInContainer}
        {...props}
        secureTextEntry={!isVisible}
      />
      <Pressable
        onPressIn={() => {
          setIsVisible(true);
        }}
        onPressOut={() => {
          setIsVisible(false);
        }}
      >
        <FontAwesome5
          name={!isVisible ? "eye-slash" : "eye"}
          size={16}
          id="eyeIcon"
          style={styles.iconOverlay}
        />
      </Pressable>
    </View>
  );
};

export default InputSecure;

const styles = StyleSheet.create({
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    borderStyle: "solid",
    padding: 10,
    height: 45,
    width: "100%",
    flexWrap: "nowrap",
    flexDirection: "row",
    alignItems: "center",
    padding: 0,
    justifyContent: "stretch",
    // backgroundColor: "blue",
  },
  inputInContainer: {
    flex: 1,
    padding: 10,
    height: 45,
    // backgroundColor: "pink",
  },
  inputError: {
    backgroundColor: "lightyellow",
  },
  iconOverlay: {
    color: colors.lightgrey,
  },
});
