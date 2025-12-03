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
import { useState } from "react";
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
  const [error, setError] = useState(false);
  const [hasBeenSubmitted, setHasBeenSubmitted] = useState(false);
  const { login } = useRbnbContext();

  const handlechange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const submit = async () => {
    const { email, username, password, confirmPassword, description } =
      formData;
    if (password !== confirmPassword) {
      setError("Please fill the same passwords");
      return;
    }
    if (
      ![
        "email",
        "username",
        "password",
        "confirmPassword",
        "description",
      ].every((prop) => formData[prop])
    ) {
      setHasBeenSubmitted(true);
      setError("Please provide all requirements for Sign up");
      return;
    }
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    try {
      console.log("body", formData);
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

  return (
    <Container>
      <Header>Sign up</Header>
      <Wrapper>
        <Input
          onChangeText={(text) => handlechange("email", text)}
          value={formData.email}
          placeholder="email"
          hasError={!formData["email"] && hasBeenSubmitted}
        />
        <Input
          onChangeText={(text) => handlechange("username", text)}
          value={formData.username}
          placeholder="username"
          hasError={!formData["username"] && hasBeenSubmitted}
        />
        <Input
          onChangeText={(text) => handlechange("description", text)}
          value={formData.description}
          placeholder="Describe yourself in a few words..."
          hasError={!formData["description"] && hasBeenSubmitted}
          isTextarea
        />
        <InputSecure
          placeholder="password"
          onChangeText={(text) => handlechange("password", text)}
          value={formData.password}
          hasError={!formData["description"] && hasBeenSubmitted}
        />
        <InputSecure
          placeholder="confirm password"
          onChangeText={(text) => handlechange("confirmPassword", text)}
          value={formData.confirmPassword}
          hasError={!formData["description"] && hasBeenSubmitted}
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
