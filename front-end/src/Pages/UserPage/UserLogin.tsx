import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
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

const UserLogin: React.FC = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { login } = useAuth();
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
    //step1 ----> validation for email and password :
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
    //login payload
    try {
      const loginPayload = {
        email: email,
        password: password,
      };
      //step2 -----> send email and password towards the server to check if the user exists or not :
      const loginResponse = await axios.post<loginData>(
        `${baseUrl}/user/login`,
        loginPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          timeout: axiosTimeout,
          validateStatus: (status: number) => status < 550,
        },
      );
      //if user desn't exist , throw and error :
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
      //if user exists refresh email and password input field :
      setEmail("");
      setPassword("");
      
      //step4 -----> if access_token is correct send the second request towards the server to get user data


      //step5 ----> if the user exists and request is successful use access_token to for login process :
      await login()

      dispatch(
        showNotification({
          name: "login-success",
          message: `Login successfully`,
          severity: "success",
        }),
      );

      //step6 ----> then navigate to user profile page :
      Navigate("/userProfile");
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
