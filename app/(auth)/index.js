import {
  Header,
  Container,
  Wrapper,
  Input,
  InputSecure,
  ButtonOutline,
  ErrorMsg,
  LoadingThrobber,
  SamllLink,
} from "../../components/";
import { useState, useRef } from "react";
import axios from "axios";
import { useRbnbContext } from "../../Context/AuthContext";

export default function HomePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useRbnbContext();

  const submit = async () => {
    if (!email || !password) {
      seterror("Please fill all fields");
      return;
    } else {
      seterror(false);
      try {
        setIsSubmitting(true);
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          { email, password }
        );
        // const response = await axios.post("https://httpbin.org/delay/1", {
        //   email,
        //   password,
        // });
        // router.navigate("/in");
        const { id, token } = response.data;
        login(id, token);
      } catch (error) {
        seterror(error.response.data.error);
        console.log(error.response ? error.response.data.error : error.message);
      }
      setIsSubmitting(false);
    }
  };

  const refInput = useRef(null);

  return isSubmitting ? (
    <LoadingThrobber />
  ) : (
    <Container>
      <Header>Sign in</Header>
      <Wrapper>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="email"
          onSubmitEditing={() => {
            refInput.current.focus();
          }}
          enterKeyHint="next"
        />
        <InputSecure
          placeholder="password"
          onChangeText={setPassword}
          value={password}
          onSubmitEditing={submit}
          ref={refInput}
          enterKeyHint="send"
        />
      </Wrapper>
      <Wrapper>
        <ErrorMsg error={error}></ErrorMsg>
        <ButtonOutline onPress={submit}>Sign in</ButtonOutline>
        <SamllLink href="/signup" text="No account ? Register" />
      </Wrapper>
    </Container>
  );
}
