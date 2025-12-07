import {
  Header,
  Container,
  Wrapper,
  Form,
  LoadingThrobber,
  SamllLink,
} from "../../components/";
import { useState, useRef } from "react";
import axios from "axios";
import { useRbnbContext } from "../../Context/AuthContext";
import * as v from "valibot";

export default function HomePage() {
  // Set the error from the backend on submitting
  const [errorBackend, setErrorBackend] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useRbnbContext();

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
    password: {
      type: "password",
      placeholder: "Merci de saisir ton mot de passe",
      v: v.pipe(
        v.string(""),
        v.nonEmpty("Merci de saisir votre mot de passe.")
        // v.minLength(8, "Votre mot de passe doit avoir au moins 8 caractères")
      ),
    },
  };

  // Store data input values
  const [formData, setFormData] = useState(
    Object.keys(inputs).reduce((sum, key) => {
      return { ...sum, [key]: "" };
    }, {})
  );

  const submit = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        formData
      );
      // const response = await axios.post("https://httpbin.org/delay/1", {
      //   email,
      //   password,
      // });
      // router.navigate("/in");
      const { id, token } = response.data;
      login(id, token);
    } catch (error) {
      console.log(error.response ? error.response.data.error : error.message);
      setErrorBackend(error.response.data.error);
    }
    setIsSubmitting(false);
  };

  return isSubmitting ? (
    <LoadingThrobber />
  ) : (
    <Container>
      <Header>Sign in</Header>
      <Form
        inputs={inputs}
        submit={submit}
        formData={formData}
        setFormData={setFormData}
        errorBackend={errorBackend}
        submitLabel="Sign in"
      />
      <Wrapper>
        <SamllLink href="/signup" text="No account ? Register" />
      </Wrapper>
    </Container>
  );
}
