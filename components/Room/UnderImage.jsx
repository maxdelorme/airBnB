import { Text, Image, View, StyleSheet } from "react-native";
import colors from "../../assets/css/colors";
import Foundation from "@expo/vector-icons/Foundation";

const UnderImage = ({ room }) => {
  const { title, ratingValue, reviews, user } = room;
  return (
    <View style={styles.underImage}>
      <View style={{ flex: 1, justifyContent: "space-around" }}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 5 }}>
            {Array(5)
              .fill()
              .map((_a, index) => {
                return (
                  <Foundation
                    key={index}
                    name="star"
                    size={24}
                    color={index < ratingValue ? "#FFB100" : colors.lightgrey}
                  />
                );
              })}
          </View>
          <View>
            <Text style={styles.reviews}>{reviews} reviews</Text>
          </View>
        </View>
      </View>
      <Image
        src={user.account.photo.url}
        style={styles.avatar}
        resizeMode="contain"
      ></Image>
    </View>
  );
};

export default UnderImage;

const styles = StyleSheet.create({
  underImage: {
    flexDirection: "row",
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 90,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  reviews: {
    color: colors.lightgrey,
    alignSelf: "flex-start",
  },
});
