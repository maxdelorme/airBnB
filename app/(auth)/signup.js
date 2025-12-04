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
import * as v from "valibot";

export default function HomePage() {
  const inputIDs = [
    "email",
    "username",
    "description",
    "password",
    "confirmPassword",
  ];

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
    password: v.pipe(
      v.string(""),
      v.nonEmpty("Merci de saisir votre mot de passe."),
      v.minLength(8, "Votre mot de passe doit avoir au moins 8 caractères")
    ),
    confirmPassword: v.pipe(
      v.string(""),
      v.nonEmpty("Merci de saisir votre mot de passe."),
      v.minLength(8, "Votre mot de passe doit avoir au moins 8 caractères")
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

  const { login } = useRbnbContext();

  const handlechange = (key, value) => {
    setHasErrorOn({ ...hasErrorOn, [key]: false });
    setFormData({ ...formData, [key]: value });
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

    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorsOn({
        ...initErrors,
        password: ["Les mots de passe sont différents"],
        confirmPassword: ["Les mots de passe sont différents"],
      });
      setHasErrorOn({
        ...ishasErrorInit,
        password: true,
        confirmPassword: true,
      });
      focusOn("password");
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
      login(id, token);
    } catch (error) {
      setErrorBackend(error.response.data.error);
      console.log(error.response ? error.response.data.error : error.message);
    }
  };

  let allRefs = {};
  inputIDs.forEach((element) => {
    allRefs[element] = useRef();
  });

  const focusOn = (key) => {
    console.log("focus on", key);
    allRefs[key].current.focus();
  };

  return (
    <Container>
      <Header>Sign up</Header>
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
        <InputSecure
          onChangeText={(text) => handlechange("password", text)}
          value={formData.password}
          hasError={hasErrorOn.password}
          errors={errorsOn.password}
          ref={allRefs["password"]}
          placeholder="password"
          onSubmitEditing={() => {
            focusOn("confirmPassword");
          }}
          enterKeyHint="next"
        />
        <InputSecure
          onChangeText={(text) => handlechange("confirmPassword", text)}
          value={formData.confirmPassword}
          hasError={hasErrorOn.confirmPassword}
          errors={errorsOn.confirmPassword}
          ref={allRefs["confirmPassword"]}
          placeholder="confirm password"
          onSubmitEditing={submit}
          enterKeyHint="send"
        />
      </Wrapper>
      <Wrapper>
        <ErrorMsg error={errorBackend} />
        <ButtonOutline onPress={submit}>Sign up</ButtonOutline>
        <SamllLink href="/" text="Already have an account? sign in" />
      </Wrapper>
    </Container>
  );
}
