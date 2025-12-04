import { ActivityIndicator, View, Text, Pressable } from "react-native";
import { Container } from "../../../components";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { RoomPict, UnderImage } from "../../../components/Room";

const Room = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const isLoading = Boolean(!data);
  const [isDescOpen, setIsDescOpen] = useState(false);

  const getData = async () => {
    if (id) {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/" + id
        );

        setData(data);
      } catch (error) {
        console.log(
          error.response ? error.response.data.message : error.message
        );
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // console.log(data);

  return isLoading ? (
    <Container>
      <ActivityIndicator />
    </Container>
  ) : (
    <>
      <RoomPict room={data} />
      <View style={{ padding: 10 }}>
        <UnderImage room={data} />
        <Pressable
          onPress={() => {
            setIsDescOpen(!isDescOpen);
          }}
        >
          <Text numberOfLines={isDescOpen ? 0 : 3}>{data.description}</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Room;
