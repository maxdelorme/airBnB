import { Header, Container, Wrapper, Form, SamllLink } from "../../components/";
import { useState } from "react";
import axios from "axios";
import { useRbnbContext } from "../../Context/AuthContext";
import * as v from "valibot";

export default function HomePage() {
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
    password: {
      type: "password",
      placeholder: "Merci de saisir ton mot de passe",
      v: v.pipe(
        v.string(""),
        v.nonEmpty("Merci de saisir votre mot de passe."),
        v.minLength(8, "Votre mot de passe doit avoir au moins 8 caractères")
      ),
    },
    confirmPassword: {
      type: "password",
      placeholder: "Merci de confirmer ton mot de passe",
      v: v.pipe(
        v.string(""),
        v.nonEmpty("Merci de saisir votre mot de passe."),
        v.minLength(8, "Votre mot de passe doit avoir au moins 8 caractères")
      ),
    },
  };

  // Store data input values
  const [formData, setFormData] = useState(
    Object.keys(inputs).reduce((sum, key) => {
      return { ...sum, [key]: "" };
    }, {})
  );

  // Set the error from the backend on submitting
  const [errorBackend, setErrorBackend] = useState(false);

  const submit = async () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorBackend("Les mots de passe sont différents");
      return;
    }

    try {
      // console.log("body", formData);
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        formData
      );
      setErrorBackend(false);
      const { id, token } = response.data;

      const { login } = useRbnbContext();
      login(id, token);
    } catch (error) {
      setErrorBackend(error.response.data.error);
      console.log(error.response ? error.response.data.error : error.message);
    }
  };

  return (
    <Container>
      <Header>Sign up</Header>
      <Form
        inputs={inputs}
        submit={submit}
        formData={formData}
        setFormData={setFormData}
        errorBackend={errorBackend}
        submitLabel="Sign up"
      />
      <Wrapper>
        <SamllLink href="/" text="Already have an account? sign in" />
      </Wrapper>
    </Container>
  );
}
