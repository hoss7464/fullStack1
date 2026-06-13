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
  RegisterIcon1,
  RegisterIcon2,
  RegisterIcon3,
  RegisterIcon4,
  RegisterIcon5,
  RegisterSubmitButton,
  RegisterQuestionWrapper,
  RegiterLink,
} from "./UserElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Redux/actions/notifSlice";
import { serverErrorMessageFunc } from "../../Utils/errorFunction";
//---------------------------------------------------------------------------
interface registerData {
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

const UserRegister: React.FC = () => {
  const dispatch = useDispatch();
  //States for usesrname input :
  const [username, setUsername] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");
  //Email states :
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  //Phone states :
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setphoneError] = useState<string>("");
  //Password states :
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  //Confirm password states :
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");

  const baseUrl = import.meta.env.VITE_LOCAL_URL;
  const axiosTimeout = import.meta.env.VITE_AXIOS_TIME_OUT;

  //---------------------------------------------------------------------------
  //username functions
  const usernameValidation = (value: string) => {
    const usernameRegX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z0-9]{8,}$/;
    return usernameRegX.test(value);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = event.target.value.trim();
    setUsername(newValue);

    //if username is empty
    if (newValue === "") {
      setUsernameError("required");
      return;
    }

    // if username is more than 30 characters
    if (newValue.length > 30) {
      setUsernameError("username is too long");
      return;
    }

    // validation
    const isValid = usernameValidation(newValue);
    if (!isValid) {
      setUsernameError("username: U/u/num");
      return;
    }

    setUsernameError("");
  };
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
  //phone function :
  const phoneValidation = (value: string) => {
    const phoneRegX = /^\+[1-9]\d{9,14}$/;
    return phoneRegX.test(value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
      .trim() // remove leading/trailing space
      .replace(/\s+/g, "") // remove all whitespace
      .replace(/[^\x00-\x7F]/g, ""); // remove unicode

    setPhone(newValue);

    if (newValue === "") {
      setphoneError("required");
      return;
    }
    // safe length restriction for phone must be 15
    if (newValue.length > 15) {
      setphoneError("phone is too long");
      return;
    }

    const validatePhone = phoneValidation(newValue);

    if (!validatePhone) {
      setphoneError("wrong format");
      return;
    }

    setphoneError("");
  };

  const handlePhoneKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    phoneValue: string,
  ) => {
    const isDigit = /[0-9]/.test(e.key);
    const isPlus = e.key === "+";
    const isControl =
      e.key === "Backspace" ||
      e.key === "Delete" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "Tab";

    // Allow digits and control keys
    if (isDigit || isControl) return;

    // Allow + only if at the start and not already present
    if (
      isPlus &&
      phoneValue.indexOf("+") === -1 &&
      e.currentTarget.selectionStart === 0
    )
      return;

    // Block everything else
    e.preventDefault();
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
  //confirm password functions :
  const confirmPasswordValidation = (value: string) => {
    return value === password;
  };

  const handleConfirmPassChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = event.target.value
      .trim() // remove leading/trailing spaces
      .replace(/\s+/g, "") // remove internal whitespace
      .replace(/[^\x00-\x7F]/g, ""); // remove unicode characters

    setConfirmPass(newValue);

    if (newValue === "") {
      setConfirmPassError("required");
      return;
    }

    if (!confirmPasswordValidation(newValue)) {
      setConfirmPassError("password does not match");
      return;
    }

    setConfirmPassError("");
  };
  //---------------------------------------------------------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      usernameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPassError
    ) {
      dispatch(
        showNotification({
          name: "register-error3",
          message: `Fields are not completed`,
          severity: "error",
        }),
      );
      return;
    }

    try {
      const registerPayload = {
        username: username,
        email: email,
        phone: phone,
        password: password,
        confirmPass: confirmPass,
      };

      const registerResponse = await axios.post<registerData>(
        `${baseUrl}/user/register`,
        registerPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeout,
          validateStatus: (status: number) => status < 550,
        },
      );

      if (registerResponse.data.success === false) {
        const serverError = serverErrorMessageFunc(registerResponse.data.message)
        dispatch(
          showNotification({
            name: "register-error1",
            message: `${serverError}`,
            severity: "error",
          }),
        );
        return;
      }

      setUsername("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPass("");
      dispatch(
        showNotification({
          name: "register-success",
          message: `Registration successfully`,
          severity: "success",
        }),
      );
    } catch (error) {
      dispatch(
        showNotification({
          name: "Register-error2",
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
              <RegisterHeader>Registeration</RegisterHeader>
            </RegisterHeaderWrapper>
            {/*user input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Username</RegisterLabel>
                {usernameError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{usernameError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon1 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
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
            {/*phone input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Phone</RegisterLabel>
                {phoneError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{phoneError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon3 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="phone"
                    type="text"
                    value={phone}
                    onKeyDown={(e) => handlePhoneKeyDown(e, phone)}
                    onChange={handlePhoneChange}
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
            {/*Confitm password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Confirm</RegisterLabel>
                {confirmPassError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{confirmPassError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon5 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="Confirm-password"
                    value={confirmPass}
                    onChange={handleConfirmPassChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*submit button */}
            <RegisterSubmitButton type="submit">Submit</RegisterSubmitButton>
            <RegisterQuestionWrapper>
              <RegiterLink to="/userLogin">Do you have an account?</RegiterLink>
            </RegisterQuestionWrapper>
          </RegisterForm>
        </RegisterWrapper>
      </RegisterContainer>
    </>
  );
};

export default UserRegister;
