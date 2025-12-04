import { TextInput, StyleSheet, View, Pressable, Text } from "react-native";
import colors from "../assets/css/colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useState } from "react";

const InputSecure = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <View
        style={[styles.inputContainer, props.hasError && styles.inputError]}
      >
        <TextInput
          style={styles.inputInContainer}
          {...props}
          secureTextEntry={!isVisible}
          autoCapitalize="none"
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
  error: {
    color: colors.alert,
    fontSize: 10,
  },
});
