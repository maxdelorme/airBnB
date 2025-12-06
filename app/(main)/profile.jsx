import { useRbnbContext } from "../../Context/AuthContext";
import { useState, useEffect, useRef } from "react";
import { ActivityIndicator, View } from "react-native";
import { pickImage, takePicture } from "../../utils/mediaAccess";

import axios from "axios";
import {
  Container,
  Wrapper,
  Input,
  ButtonOutline,
  ErrorMsg,
  Avatar,
  ButtonIcons,
} from "../../components/";
import * as v from "valibot";

const Profile = () => {
  const { logout } = useRbnbContext();
  const { userID, userToken } = useRbnbContext();
  const [isLoading, setIsLoading] = useState(true);

  const inputIDs = ["email", "username", "description"];

  const formSchema = v.object({
    email: v.pipe(
      v.string(""),
      v.nonEmpty("Merci de saisir votre email."),
      v.email("L'adresse email est invalide.")
    ),
    username: v.pipe(v.string(), v.nonEmpty("Merci de saisir votre nom.")),
    description: v.pipe(
      v.string(""),
      v.nonEmpty("Merci de saisir une description."),
      v.minLength(8, "Votre description doit avoir au moins 8 caractères")
    ),
  });

  // Store date input values
  const [formData, setFormData] = useState(
    inputIDs.reduce((sum, item) => {
      sum[item] = "";
      return sum;
    }, {})
  );

  // if the field has an error after submitting
  const ishasErrorInit = inputIDs.reduce((sum, item) => {
    sum[item] = false;
    return sum;
  }, {});
  const [hasErrorOn, setHasErrorOn] = useState(ishasErrorInit);

  // Store each errors on validating the fiels by valibot
  const initErrors = inputIDs.reduce((sum, item) => {
    sum[item] = [];
    return sum;
  }, {});
  const [errorsOn, setErrorsOn] = useState(initErrors);

  // Set the error from the backend on submitting
  const [errorBackend, setErrorBackend] = useState(false);

  let allRefs = {};
  inputIDs.forEach((element) => {
    allRefs[element] = useRef();
  });

  const focusOn = (key) => {
    // console.log("focus on", key);
    allRefs[key].current.focus();
  };

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

  const handlechange = (key, value) => {
    setHasErrorOn({ ...hasErrorOn, [key]: false });
    setFormData({ ...formData, [key]: value });
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
    const vResult = v.safeParse(formSchema, formData);

    let isFirstError = true;
    if (!vResult.success) {
      const copyErrors = { ...initErrors };
      vResult.issues.forEach((issue) => {
        const field = issue.path[0].key;

        if (isFirstError) focusOn(field);
        isFirstError = false;

        copyErrors[field].push(issue.message);
      });
      setErrorsOn(copyErrors);

      const copyHasError = { ...ishasErrorInit };
      for (const key in copyErrors) {
        if (initErrors[key].length) {
          copyHasError[key] = true;
        }
      }
      setHasErrorOn(copyHasError);
      return;
    }

    setErrorsOn({ ...initErrors });

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
      const { id, token } = response.data;
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

      <Wrapper>
        <Input
          onChangeText={(text) => handlechange("email", text)}
          value={formData.email}
          hasError={hasErrorOn.email}
          errors={errorsOn.email}
          ref={allRefs["email"]}
          placeholder="email"
          keyboardType="email-address"
          onSubmitEditing={() => {
            focusOn("username");
          }}
          enterKeyHint="next"
        />
        <Input
          onChangeText={(text) => handlechange("username", text)}
          value={formData.username}
          hasError={hasErrorOn.username}
          errors={errorsOn.username}
          ref={allRefs["username"]}
          placeholder="username"
          onSubmitEditing={() => {
            focusOn("description");
          }}
          enterKeyHint="next"
        />
        <Input
          onChangeText={(text) => handlechange("description", text)}
          value={formData.description}
          hasError={hasErrorOn.description}
          errors={errorsOn.description}
          ref={allRefs["description"]}
          placeholder="Describe yourself in a few words..."
          isTextarea
          enterKeyHint="next"
        />
      </Wrapper>
      <Wrapper>
        <ErrorMsg error={errorBackend} />
        <ButtonOutline onPress={submit}>Update</ButtonOutline>
      </Wrapper>
      <Wrapper>
        <ButtonOutline onPress={logout} variant="fill" text="Se Déconnecter">
          Se déconnecter
        </ButtonOutline>
      </Wrapper>
    </Container>
  );
};

export default Profile;
