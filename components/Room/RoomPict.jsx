import { Pressable, Image, View, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import { router } from "expo-router";
import colors from "../../assets/css/colors";

const RoomPict = ({ room, pushParams }) => {
  const { photos, price } = room;
  return (
    <View style={{ height: 200 }}>
      {/* <Image src={photos[0].url} style={styles.image}></Image> */}
      <Swiper
        style={{
          height: 200,
        }}
        onTouchEnd={(e) => {
          e.stopPropagation();
        }}
      >
        {photos.map((item, index) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.lightgrey,
              }}
            >
              <Pressable
                onPress={() => {
                  pushParams && router.push(pushParams);
                }}
                style={{ width: "100%" }}
              >
                <Image key={index} src={item.url} style={styles.image}></Image>
              </Pressable>
            </View>
          );
        })}
      </Swiper>
      {/* <Text style={styles.price}>{price} €</Text> */}
    </View>
  );
};

export default RoomPict;

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: "100%",
  },
  price: {
    backgroundColor: "black",
    color: "white",
    position: "absolute",
    bottom: 10,
    fontSize: 20,
    paddingBlock: 10,
    paddingInline: 20,
  },
});
