import React, { useState, useCallback, useEffect, useContext } from "react";
import { useMutation, ApolloError, FetchResult } from "@apollo/client";
import { mutationUserSignUp } from "../../services/auth";

import {
  BooleanSchema,
  StringSchema,
  ObjectSchema,
  ValidationError,
} from "yup";
import { NotificationContext } from "../../context/Notification";

import { Checkbox, RadioGroup, Select, TextField, Form } from "../UI";

import mailIcon from "../../assets/icons/mail.svg";
import passIcon from "../../assets/icons/pass.svg";

type SignUpFormErrorsType = {
  [K in keyof iSignUpForm]: string;
};

enum eGender {
  Male = "MALE",
  Female = "FEMALE",
}

type SignUpFormErrorSchemaType = {
  [K in keyof SignUpFormErrorsType]: StringSchema | BooleanSchema;
};

const SIGN_UP_FORM_DEFAULT_DATA: iSignUpForm = {
  name: "",
  email: "",
  password: "",
  country: "",
  gender: "",
  isTermsAccepted: false,
};

const SIGN_UP_FORM_DEFAULT_ERRORS: SignUpFormErrorsType = Object.fromEntries(
  Object.keys(SIGN_UP_FORM_DEFAULT_DATA).map((key) => [[key], ""])
);

const SIGN_UP_FORM_ERROR_HANDLERS: SignUpFormErrorSchemaType = {
  name: new StringSchema()
    .min(3, "Name must contain at least 3 characters")
    .matches(/^[a-z]+$/gi, "Invalid name provided"),
  email: new StringSchema()
    .required("Provide your email")
    .email("Invalid email provided"),
  password: new StringSchema()
    .required("Enter new password")
    .min(6, "Password must contain at least 6 characters"),
  country: new StringSchema().required("Select your country"),
  gender: new StringSchema().oneOf(
    [eGender.Female, eGender.Male],
    "Choose your gender"
  ),
  isTermsAccepted: new BooleanSchema().isTrue(
    "You must accept terms and conditions to continue"
  ),
};

const SIGN_UP_FORM_ERROR_SCHEMA = new ObjectSchema(SIGN_UP_FORM_ERROR_HANDLERS);

const COUNTRIES_LIST: iSelectItem[] = [
  {
    label: "Latvia",
    value: "Latvia",
  },
  {
    label: "Lebanon",
    value: "Lebanon",
  },
  {
    label: "Lesotho",
    value: "Lesotho",
  },
  {
    label: "Liberia",
    value: "Liberia",
  },
  {
    label: "Libya",
    value: "Libya",
  },
  {
    label: "Libya",
    value: "Libya",
  },
];

const GENDERS_LIST: iRadioItem[] = [
  {
    label: "Male",
    value: eGender.Male,
  },
  {
    label: "Female",
    value: eGender.Female,
  },
];

const SignUpForm: React.FC = () => {
  const [signUpUser, { loading: isUserSigningUp }] = useMutation(
    mutationUserSignUp
  );

  const { addNotification } = useContext<iNotificationContext>(
    NotificationContext
  );

  const [form, setForm] = useState<iSignUpForm>(SIGN_UP_FORM_DEFAULT_DATA);
  const [formErrors, setFormErrors] = useState<SignUpFormErrorsType>(
    SIGN_UP_FORM_DEFAULT_ERRORS
  );
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    SIGN_UP_FORM_ERROR_SCHEMA.isValid(form).then((isValid) => {
      if (isSubscribed) {
        setIsFormValid(isValid);

        if (isValid === true) {
          setFormErrors(SIGN_UP_FORM_DEFAULT_ERRORS);
        }
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [form]);

  const validateFormField = useCallback(
    async (
      selector: keyof SignUpFormErrorsType,
      value: string | boolean
    ): Promise<void> => {
      let fieldError: string = "";

      try {
        await SIGN_UP_FORM_ERROR_HANDLERS[selector].validate(value);
      } catch (error: ValidationError | unknown) {
        if (error instanceof ValidationError) {
          fieldError = error.message;
        } else {
          console.error(error);
        }
      } finally {
        setFormErrors((prevFormErrors) => ({
          ...prevFormErrors,
          [selector]: fieldError,
        }));
      }
    },
    []
  );

  const onFormChange = useCallback(
    (selector: keyof iSignUpForm, value: string | boolean): void => {
      setForm((prevForm) => ({
        ...prevForm,
        [selector]: value,
      }));

      if (["country", "gender", "isTermsAccepted"].includes(selector)) {
        validateFormField(selector, value);
      }
    },
    [validateFormField]
  );

  const onFormSubmit = useCallback(async (): Promise<void> => {
    if (isUserSigningUp || !isFormValid) return;

    let notification: iNotificationProps = {
      title: "Error",
      message: "Unexpected error occured",
      type: "error",
      closeable: true,
    };

    try {
      const userInput: iSignupInput = {
        email: form.email,
        country: form.country,
        gender: form.gender,
        name: form.name,
        password: form.password,
      };

      const response: FetchResult = await signUpUser({
        variables: {
          userInput,
        },
      });

      if (response.data?.signup?.id.length > 0) {
        notification.type = "success";
        notification.title = "Success";
        notification.message = "Account successfully created!";

        addNotification(notification);
        setFormErrors(SIGN_UP_FORM_DEFAULT_ERRORS);
        setForm(SIGN_UP_FORM_DEFAULT_DATA);
      }
    } catch (error: ApolloError | unknown) {
      if (error instanceof ApolloError) {
        if (error.networkError !== null) {
          notification.message =
            "Unexpected server error occured while performing the request";
        } else {
          notification.message = error.message;
        }
      }

      addNotification(notification);
    }
  }, [addNotification, form, isFormValid, isUserSigningUp, signUpUser]);

  return (
    <Form
      title="Create a new account"
      isValid={isFormValid}
      actionTitle="Sign up"
      onAction={onFormSubmit}
      loading={isUserSigningUp}
      data-testid="signUpFormContainer"
    >
      <TextField
        placeholder="Enter your name"
        type="text"
        name="name"
        value={form.name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onFormChange("name", e.target.value);
        }}
        onBlur={() => validateFormField("name", form.name)}
        error={formErrors["name"]}
        autoFocus
      />
      <TextField
        placeholder="Email"
        icon={mailIcon}
        type="text"
        name="email"
        value={form.email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onFormChange("email", e.target.value);
        }}
        onBlur={() => validateFormField("email", form.email)}
        error={formErrors["email"]}
      />
      <TextField
        placeholder="Password"
        icon={passIcon}
        type="password"
        name="password"
        value={form.password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
          onFormChange("password", e.target.value);
        }}
        onBlur={() => validateFormField("password", form.password)}
        error={formErrors["password"]}
      />
      <Select
        items={COUNTRIES_LIST}
        placeholder="Select country"
        selected={form.country}
        onItemSelect={(value: string): void => {
          onFormChange("country", value);
        }}
        error={formErrors["country"]}
      />
      <div className="pt-2 space-y-5">
        <RadioGroup
          items={GENDERS_LIST}
          onItemSelect={(value: string) => {
            onFormChange("gender", value);
          }}
          checked={form.gender}
          error={formErrors["gender"]}
        />
        <Checkbox
          checked={form.isTermsAccepted}
          onCheckStateChange={(value: boolean): void => {
            onFormChange("isTermsAccepted", value);
          }}
          error={formErrors["isTermsAccepted"]}
        >
          <span>Accept </span>
          <a
            className="text-blue-200"
            href="https://geebrox.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            terms
          </a>
          <span> and </span>
          <a
            className="text-blue-200"
            href="https://geebrox.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            conditions
          </a>
        </Checkbox>
      </div>
    </Form>
  );
};

export default SignUpForm;
