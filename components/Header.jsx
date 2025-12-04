import { Image, Text, StyleSheet } from "react-native";
import Wrapper from "./Wrapper";
import colors from "../assets/css/colors";
import Logo from "./Logo";

const Header = (props) => {
  return (
    <Wrapper>
      <Logo />
      <Text style={styles.title}>{props.children}</Text>
    </Wrapper>
  );
};

export default Header;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: 500,
    color: colors.grey,
  },
});
