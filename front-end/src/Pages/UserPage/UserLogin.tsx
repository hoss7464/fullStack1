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
  RegisterIcon4,
  RegisterSubmitButton,
  RegisterQuestionWrapper,
  RegiterLink,
} from "./UserElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Redux/actions/notifSlice";
import { serverErrorMessageFunc } from "../../Utils/errorFunction";
//---------------------------------------------------------------------------
interface loginData {
  success: boolean;
  message: string;
  data: {
    email: string;
    password: string;
    access_token: string;
    refresh_token: string;
  };
  code: string;
}

interface loginData2 {
  success: boolean;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    userName: string;
    email: string;
    phone: string;
    date_time: string;
  };
}

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  //Email states :
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  //Password states :
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

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
      .replace(/[^\x00-\x7F]/g, ""); // to prevent none ascii characters like arabic , emojis and ...

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
  //password functions :
  const passwordValidation = (value: string) => {
    const passwordRegX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,}$/;
    return passwordRegX.test(value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
      .trim() // remove leading/trailing space
      .replace(/\s+/g, "") // remove all whitespace
      .replace(/[^\x00-\x7F]/g, ""); // remove unicode

    setPassword(newValue);

    if (newValue === "") {
      setPasswordError("required");
      return;
    }

    if (newValue.length > 30) {
      setPasswordError("password is too long");
      return;
    }

    const validatePassword = passwordValidation(newValue);

    if (!validatePassword) {
      setPasswordError("password: U/u/num/#@!$%&*()");
      return;
    }

    setPasswordError("");
  };
  //---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailError || passwordError) {
      dispatch(
        showNotification({
          name: "login-error3",
          message: `Fields are not completed`,
          severity: "error",
        }),
      );
      return;
    }

    try {
      const loginPayload = {
        email: email,
        password: password,
      };

      const loginResponse = await axios.post<loginData>(
        `${baseUrl}/user/login`,
        loginPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeout,

          validateStatus: (status: number) => status < 550,
        },
      );

      if (loginResponse.data.success === false) {
        const serverError = serverErrorMessageFunc(loginResponse.data.message);
        dispatch(
          showNotification({
            name: "login-error1",
            message: `${serverError}`,
            severity: "error",
          }),
        );
        return;
      }

      setEmail("");
      setPassword("");

      const access_token = loginResponse?.data?.data?.access_token;

      const loginData = await axios.get<loginData2>(`${baseUrl}/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          "x-token": access_token ?? "",
        },
        timeout: axiosTimeout,

        validateStatus: (status: number) => status < 550,
      });

      if (loginData.data.success === false) {
        const serverError = serverErrorMessageFunc(loginResponse.data.message);

        dispatch(
          showNotification({
            name: "login-error1",
            message: `${serverError}`,
            severity: "error",
          }),
        );
        return;
      }

      dispatch(
        showNotification({
          name: "login-success",
          message: `Login successfully`,
          severity: "success",
        }),
      );

      console.log(loginData.data);
    } catch (error) {
      dispatch(
        showNotification({
          name: "login-error2",
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
              <RegisterHeader>Log in</RegisterHeader>
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
            {/*Password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Password</RegisterLabel>
                {passwordError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{passwordError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon4 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            <RegisterSubmitButton type="submit">Log in</RegisterSubmitButton>
            <RegisterQuestionWrapper>
              <RegiterLink to="/userRegister">
                Don't you have an account?
              </RegiterLink>
            </RegisterQuestionWrapper>
            <RegisterQuestionWrapper>
              <RegiterLink to="/userForgot">Forgot your password?</RegiterLink>
            </RegisterQuestionWrapper>
          </RegisterForm>
        </RegisterWrapper>
      </RegisterContainer>
    </>
  );
};

export default UserLogin;
