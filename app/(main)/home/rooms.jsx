import { ActivityIndicator, FlatList, Pressable, View } from "react-native";
import { Container, Separator } from "../../../components";
import { RoomPict, UnderImage } from "../../../components/Room";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import axios from "axios";

const Rooms = () => {
  const [data, setData] = useState(null);
  const isLoading = Boolean(!data);
  const router = useRouter();

  const getData = async () => {
    try {
      const { data } = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
      );

      setData(data);
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading)
    return (
      <Container>
        <ActivityIndicator />
      </Container>
    );

  return (
    <FlatList
      data={data}
      style={{ padding: 20 }}
      contentContainerStyle={{ paddingBlockEnd: 30 }}
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => {
        const pushParams = {
          pathname: "/home/room",
          params: {
            id: item._id,
          },
        };
        return (
          <View style={{ gap: 10 }}>
            <RoomPict room={item} pushParams={pushParams} />
            <Pressable
              onPress={() => {
                router.push(pushParams);
              }}
            >
              <View>
                <UnderImage room={item} />
              </View>
            </Pressable>
          </View>
        );
      }}
      ItemSeparatorComponent={() => <Separator />}
    ></FlatList>
  );
};

export default Rooms;
