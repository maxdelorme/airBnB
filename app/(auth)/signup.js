import {
  Header,
  Container,
  Wrapper,
  Input,
  InputSecure,
  ButtonOutline,
  ErrorMsg,
  SamllLink,
} from "../../components/";
import { useState, useRef } from "react";
import axios from "axios";
import { useRbnbContext } from "../../Context/AuthContext";

export default function HomePage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    description: "",
  });
  const [hasErrorOn, setHasErrorOn] = useState({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
    description: false,
  });
  const [error, setError] = useState(false);
  const { login } = useRbnbContext();
  const inputIDs = [
    "email",
    "username",
    "description",
    "password",
    "confirmPassword",
  ];

  const handlechange = (key, value) => {
    setHasErrorOn({ ...hasErrorOn, [key]: false });
    setFormData({ ...formData, [key]: value });
  };

  const submit = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setError("Please fill the same passwords");
      return;
    }

    let hasError = false;
    const copy = { ...hasErrorOn };
    inputIDs.forEach((prop) => {
      if (!formData[prop]) {
        if (!hasError) focusOn(prop);
        hasError = true;
        copy[prop] = true;
      }
    });
    setHasErrorOn(copy);

    if (hasError) {
      setError("Please provide all requirements for Sign up");
      return;
    }

    try {
      // console.log("body", formData);
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        formData
      );
      setError(false);
      const { id, token } = response.data;
      login(id, token);
    } catch (error) {
      setError(error.response.data.error);
      console.log(error.response ? error.response.data.error : error.message);
    }
  };

  let allRefs = {};
  inputIDs.forEach((element) => {
    allRefs[element] = useRef();
  });

  const focusOn = (key) => {
    allRefs[key].current.focus();
  };

  return (
    <Container>
      <Header>Sign up</Header>
      <Wrapper>
        <Input
          onChangeText={(text) => handlechange("email", text)}
          value={formData.email}
          ref={allRefs["email"]}
          placeholder="email"
          hasError={hasErrorOn.email}
          keyboardType="email-address"
          onSubmitEditing={() => {
            focusOn("username");
          }}
          enterKeyHint="next"
        />
        <Input
          onChangeText={(text) => handlechange("username", text)}
          value={formData.username}
          ref={allRefs["username"]}
          placeholder="username"
          hasError={hasErrorOn.username}
          onSubmitEditing={() => {
            focusOn("description");
          }}
          enterKeyHint="next"
        />
        <Input
          onChangeText={(text) => handlechange("description", text)}
          value={formData.description}
          ref={allRefs["description"]}
          placeholder="Describe yourself in a few words..."
          hasError={hasErrorOn["description"]}
          isTextarea
          enterKeyHint="next"
        />
        <InputSecure
          placeholder="password"
          onChangeText={(text) => handlechange("password", text)}
          value={formData.password}
          ref={allRefs["password"]}
          hasError={hasErrorOn.password}
          onSubmitEditing={() => {
            focusOn("confirmPassword");
          }}
          enterKeyHint="next"
        />
        <InputSecure
          placeholder="confirm password"
          onChangeText={(text) => handlechange("confirmPassword", text)}
          value={formData.confirmPassword}
          ref={allRefs["confirmPassword"]}
          hasError={hasErrorOn.confirmPassword}
          onSubmitEditing={submit}
          enterKeyHint="send"
        />
      </Wrapper>
      <Wrapper>
        <ErrorMsg error={error} />
        <ButtonOutline onPress={submit}>Sign up</ButtonOutline>
        <SamllLink href="/" text="Already have an account? sign in" />
      </Wrapper>
    </Container>
  );
}
