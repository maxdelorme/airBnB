import { useRbnbContext } from "../../Context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { pickImage, takePicture } from "../../utils/mediaAccess";
import { Form } from "../../components";

import axios from "axios";
import {
  Container,
  Wrapper,
  ButtonOutline,
  Avatar,
  ButtonIcons,
} from "../../components/";
import * as v from "valibot";

const Profile = () => {
  const { logout } = useRbnbContext();
  const { userID, userToken } = useRbnbContext();
  const [isLoading, setIsLoading] = useState(true);

  const inputs = {
    email: {
      type: "text",
      placeholder: "saisi ici ton email",
      keyboardType: "email-address",
      v: v.pipe(
        v.string(""),
        v.nonEmpty("Merci de saisir votre email."),
        v.email("L'adresse email est invalide.")
      ),
    },
    username: {
      type: "text",
      placeholder: "saisi ici ton nom",
      v: v.pipe(v.string(), v.nonEmpty("Merci de saisir votre nom.")),
    },
    description: {
      type: "textarea",
      placeholder: "Describe yourself in a few words...",
      v: v.pipe(
        v.string(""),
        v.nonEmpty("Merci de saisir une description."),
        v.minLength(8, "Votre description doit avoir au moins 8 caractères")
      ),
    },
  };

  // Store date input values
  const [formData, setFormData] = useState(
    Object.keys(inputs).reduce((sum, key) => {
      return { ...sum, [key]: "" };
    }, {})
  );

  // Set the error from the backend on submitting
  const [errorBackend, setErrorBackend] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/" +
          userID,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setFormData({ ...data, photo: data.photo.url });
      setIsLoading(false);
    } catch (error) {
      console.log(error.response ? error.response.data.message : error.message);
    }
  };

  const setAvatar = async (imageProvider) => {
    try {
      const photo = await imageProvider();
      if (!photo) return;
      setFormData({ ...formData, photo });

      // récupération du format (jpg) de notre image :
      const format = photo.split(".").at(-1); // ["dqsdqs/",..., "jpg"]
      const formDataPhoto = new FormData();

      formDataPhoto.append("photo", {
        uri: photo,
        name: `avatar.${format}`, // `chat.jpg`
        type: `image/${format}`, // `image/jpg`
      });

      // remplacez localhost par l'ip de votre ordinateur si vous travaillez en local
      // sur Android
      const reponse = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/upload_picture",
        formDataPhoto,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log(reponse.data);
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.error
        : error.message;
      console.log(errorMsg);
      setErrorBackend(errorMsg);
    }
  };

  const submit = async () => {
    try {
      const response = await axios.put(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      setErrorBackend(false);
      alert("Votre profile a été mis à jour");
    } catch (error) {
      const errorMsg = error.response
        ? error.response.data.error
        : error.message;
      console.log(errorMsg);
      setErrorBackend(errorMsg);
    }
  };

  // formData && console.log(formData);

  if (isLoading)
    return (
      <Container>
        <ActivityIndicator color={"green"} />
      </Container>
    );

  return (
    <Container>
      <Wrapper>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Avatar src={formData.photo} onPress={() => setAvatar(pickImage)} />
          <View style={{ gap: 50, justifyContent: "center" }}>
            <ButtonIcons
              iconName="picture-o"
              onPress={() => setAvatar(pickImage)}
            />
            <ButtonIcons
              iconName="camera"
              onPress={() => setAvatar(takePicture)}
            />
          </View>
        </View>
      </Wrapper>
      <Form
        inputs={inputs}
        submit={submit}
        formData={formData}
        setFormData={setFormData}
        errorBackend={errorBackend}
        submitLabel="Update"
      />
      <Wrapper>
        <ButtonOutline onPress={logout} variant="fill" text="Se Déconnecter">
          Se déconnecter
        </ButtonOutline>
      </Wrapper>
    </Container>
  );
};

export default Profile;
