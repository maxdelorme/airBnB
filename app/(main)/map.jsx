import { View } from "react-native";

import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import axios from "axios";
import { useRouter } from "expo-router";

const Map = () => {
  const [markers, setMarkers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const currentPosition = await getPositionAsync();

      // console.log({ currentPosition });

      if (currentPosition.coords) {
        const settings = {
          latitude: currentPosition.coords.latitude,
          longitude: currentPosition.coords.longitude,
        };

        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around/",
          { params: settings }
        );
        setMarkers(data);
      }
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  const getPositionAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Merci d'autorisé l'application à accéder à votre position dans vos paramètres de sécurité"
      );
      return;
    }
    const position = await Location.getCurrentPositionAsync();
    return position;
  };

  // markers && console.log({ markers });
  // askPermissionForLocalisation();
  return (
    <View>
      <MapView
        style={{ height: "100%" }}
        initialRegion={{
          latitude: 48.856614,
          longitude: 2.3522219,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
        showsUserLocation={true}
      >
        {markers.map((marker) => {
          return (
            <Marker
              key={marker._id}
              coordinate={{
                longitude: marker.location[0],
                latitude: marker.location[1],
              }}
              title={marker.title}
              description={marker.description}
              onPress={() => {
                router.push({
                  pathname: "/home/room/",
                  params: {
                    id: marker._id,
                  },
                });
              }}
            />
          );
        })}
      </MapView>
    </View>
  );
};

export default Map;
