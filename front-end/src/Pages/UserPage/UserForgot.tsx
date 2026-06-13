import React, { useState } from "react";
import axios from "axios";
import {
  RegisterContainer,
  RegisterWrapper,
  RegisterForm,
  RegisterHeaderWrapper,
  RegisterHeader,
  RegisterInputLabelWrapper,
  RegisterLableErrorWrapper,
  RegisterLabel,
  RegisterErrorWrapper,
  RegisterError,
  RegisterInputWrapper,
  RegisterInputWrapper2,
  RegisterInput,
  RegisterIconWrapper,
  RegisterIcon2,
  RegisterSubmitButton,
} from "./UserElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Redux/actions/notifSlice";
import { serverErrorMessageFunc } from "../../Utils/errorFunction";
//---------------------------------------------------------------------------
interface forgotPassData {
  success: boolean;
  message: string;
  data: {
    username: string;
    email: string;
    phone: string;
    password: string;
    confirmPass: string;
  };
}

const UserForgot: React.FC = () => {
  const dispatch = useDispatch();
  //Email states :
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  const baseUrl = import.meta.env.VITE_LOCAL_URL;
  const axiosTimeout = import.meta.env.VITE_AXIOS_TIME_OUT;
  //---------------------------------------------------------------------------
  //email functions :
  const emailValidation = (value: string) => {
    const usernameRegX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return usernameRegX.test(value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
      .trim()
      .replace(/\s+/g, "")
      .replace(/[^\x00-\x7F]/g, ""); // to prevent non ascii characters like arabic , emojis and ...

    setEmail(newValue);

    if (newValue === "") {
      setEmailError("required");
      return;
    }

    if (newValue.length > 45) {
      setEmailError("email is too long");
      return;
    }

    const validateEmail = emailValidation(newValue);
    if (!validateEmail) {
      setEmailError("wrong format");
      return;
    }

    setEmailError("");
  };
  //---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError) {
      dispatch(
        showNotification({
          name: "forgot-error1",
          message: `Field is not completed`,
          severity: "error",
        }),
      );
      return;
    }

    try {
      const forgotPassPayload = {
        email: email,
      };

      const forgotPassResponse = await axios.post<forgotPassData>(
        `${baseUrl}/user/forgot`,
        forgotPassPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeout,
          validateStatus: (status: number) => status < 550,
        },
      );

      if (forgotPassResponse.data.success === false) {
        const serverError = serverErrorMessageFunc(forgotPassResponse.data.message)
        dispatch(
          showNotification({
            name: "forgot-error2",
            message: `${serverError}`,
            severity: "error",
          }),
        );
        return;
      }

      setEmail("");

      dispatch(
        showNotification({
          name: "forgot-success",
          message: `Forgot password retrieved successfully`,
          severity: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showNotification({
          name: "forgot-error3",
          message: `${error}`,
          severity: "error",
        }),
      );
      return;
    }
  };
  return (
    <>
      <RegisterContainer>
        <RegisterWrapper>
          <RegisterForm onSubmit={handleSubmit}>
            <RegisterHeaderWrapper>
              <RegisterHeader>Forgot Password</RegisterHeader>
            </RegisterHeaderWrapper>
            {/*Email input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Email</RegisterLabel>
                {emailError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{emailError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon2 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="email"
                    value={email}
                    type="email"
                    onChange={handleEmailChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*submit button */}
            <RegisterSubmitButton type="submit">Check</RegisterSubmitButton>
          </RegisterForm>
        </RegisterWrapper>
      </RegisterContainer>
    </>
  );
};

export default UserForgot;
