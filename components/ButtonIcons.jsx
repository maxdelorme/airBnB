import { Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const ButtonIcons = ({ onPress, iconName }) => {
  return (
    <Pressable onPress={onPress}>
      <FontAwesome name={iconName} size={24} color="grey" />
    </Pressable>
  );
};

export default ButtonIcons;
