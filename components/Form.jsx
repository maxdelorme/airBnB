import { useRef, useState } from "react";
import Input from "./Input";
import ButtonOutline from "./ButtonOutline";
import ErrorMsg from "./ErrorMsg";
import Wrapper from "./Wrapper";
import * as v from "valibot";
import { View } from "react-native";

const Form = ({
  inputs,
  submit,
  formData,
  setFormData,
  errorBackend,
  submitLabel,
}) => {
  const inputKeys = Object.keys(inputs);

  const allRefs = {},
    ishasErrorInit = {},
    initErrors = {},
    formSchema = {};

  inputKeys.forEach((key) => {
    allRefs[key] = useRef();
    ishasErrorInit[key] = false;
    initErrors[key] = [];
    formSchema[key] = inputs[key].v;
  });

  // if the field has an error after submitting
  const [hasErrorOn, setHasErrorOn] = useState(ishasErrorInit);

  // Store each errors on validating the fiels by valibot
  const [errorsOn, setErrorsOn] = useState(initErrors);

  const focusOn = (key) => {
    allRefs[key].current.focus();
  };

  const handlechange = (key, value) => {
    setHasErrorOn({ ...hasErrorOn, [key]: false });
    setFormData({ ...formData, [key]: value });
  };

  const onEndEditing = (key, value) => {
    const fieldSchema = inputs[key].v;
    const vResult = v.safeParse(fieldSchema, value);

    let messages = [];
    let hasError = false;
    if (!vResult.success) {
      messages = vResult.issues.map((issue) => issue.message);
      hasError = true;
    }
    setHasErrorOn({ ...hasErrorOn, [key]: hasError });
    setErrorsOn({ ...errorsOn, [key]: messages });
  };

  const checkAll = () => {
    const vResult = v.safeParse(v.object(formSchema), formData);

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
    }

    return vResult.success;
  };

  const disableSubmit = Object.values(hasErrorOn).some((item) => item);

  return (
    <View style={{ gap: 50, width: "100%" }}>
      <Wrapper>
        {inputKeys.map((key, index) => {
          const input = inputs[key];
          const isLast = index === inputKeys.length - 1;
          return (
            <Input
              type={input.type}
              key={index}
              onChangeText={(text) => handlechange(key, text)}
              value={formData[key]}
              hasError={hasErrorOn[key]}
              errors={errorsOn[key]}
              ref={allRefs[key]}
              placeholder={input.placeholder}
              keyboardType={input.keyboardType}
              onSubmitEditing={() => {
                isLast ? checkAll() && submit() : focusOn(inputKeys[index + 1]);
              }}
              multiline={input.type === "textarea"}
              enterKeyHint={input.enterKeyHint || (isLast ? "send" : "next")}
              onEndEditing={(target) =>
                onEndEditing(key, target.nativeEvent.text)
              }
            />
          );
        })}
      </Wrapper>
      <Wrapper>
        <ErrorMsg error={errorBackend} />
        <ButtonOutline
          onPress={() => {
            checkAll() && submit();
          }}
          variant={disableSubmit ? "disabled" : ""}
        >
          {submitLabel}
        </ButtonOutline>
      </Wrapper>
    </View>
  );
};

export default Form;
