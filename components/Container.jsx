import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../assets/css/colors";

const Container = (props) => {
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <ScrollView>
        <KeyboardAwareScrollView contentContainerStyle={styles.container}>
          {props.children}
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  SafeAreaView: {
    backgroundColor: colors.defaultBG,
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-around",
    padding: 30,
    gap: 50,
  },
});
