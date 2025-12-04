import { ActivityIndicator, FlatList, Pressable } from "react-native";
import { Container, CardRoom, Separator } from "../../../components";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import axios from "axios";

const Rooms = () => {
  const [data, setData] = useState(null);
  const isLoading = Boolean(!data);

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

  return isLoading ? (
    <Container>
      <ActivityIndicator />
    </Container>
  ) : (
    <FlatList
      data={data}
      style={{ padding: 20 }}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/home/room",
                params: {
                  id: item._id,
                },
              });
            }}
          >
            <CardRoom room={item} collapse></CardRoom>
          </Pressable>
        );
      }}
      ItemSeparatorComponent={() => <Separator />}
    ></FlatList>
  );
};

export default Rooms;
