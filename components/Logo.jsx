import { Image, View } from "react-native";
import logo from "../assets/img/airbnb.png";

const Logo = ({ height = 150 }) => {
  return (
    <Image
      source={logo}
      style={{
        height: height,
        alignSelf: "center",
      }}
      resizeMode="contain"
    />
  );
};

export default Logo;
