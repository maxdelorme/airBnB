import { Image, Text, StyleSheet } from "react-native";
import logo from "../assets/img/airbnb.png";
import Wrapper from "./Wrapper";
import colors from "../assets/css/colors";

const Header = (props) => {
  return (
    <Wrapper>
      <Image source={logo} style={{ height: 150 }} resizeMode="contain" />
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
