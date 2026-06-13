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
  RegisterIcon4,
  RegisterIcon5,
  RegisterSubmitButton,
  RegisterIcon2,
} from "./UserElements";
//---------------------------------------------------------------------------
interface changePassData {
  success: boolean;
  message: string;
  data: {
    email: string;
    oldPassword: string;
    confirmOldPassword: string;
    newPassword: string;
    confirmNewPass: string;
  };
}

const UserChange: React.FC = () => {
  //Email states :
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
    //Password states :
  const [oldPassword, setOldPassword] = useState<string>("");
  const [oldPasswordError, setOldPasswordError] = useState<string>("");
  //Confirm password states :
  const [confirmOldPass, setConfirmOldPass] = useState<string>("");
  const [confirmOldPassError, setConfirmOldPassError] = useState<string>("");
  //Password states :
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  //Confirm password states :
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");

  const baseUrl = import.meta.env.VITE_LOCAL_URL;
  const axiosTimeout = import.meta.env.VITE_AXIOS_TIME_OUT;
  //---------------------------------------------------------------------------
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
  //old password functions : 
  const oldPasswordValidation = (value: string) => {
    const passwordRegX =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d#@!$%&*()]{8,}$/;
    return passwordRegX.test(value);
  };
    const handleOldPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value
      .trim() // remove leading/trailing space
      .replace(/\s+/g, "") // remove all whitespace
      .replace(/[^\x00-\x7F]/g, ""); // remove unicode

    setOldPassword(newValue);

    if (newValue === "") {
      setOldPasswordError("required");
      return;
    }

    if (newValue.length > 30) {
      setOldPasswordError("password is too long");
      return;
    }

    const validatePassword = oldPasswordValidation(newValue);

    if (!validatePassword) {
      setOldPasswordError("password: U/u/num/#@!$%&*()");
      return;
    }

    setOldPasswordError("");
  };
  //---------------------------------------------------------------------------
  //confirm old password functions : 
    const confirmOldPasswordValidation = (value: string) => {
    return value === oldPassword;
  };
  const handleConfirmOldPassChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value
      .trim() // remove leading/trailing spaces
      .replace(/\s+/g, "") // remove internal whitespace
      .replace(/[^\x00-\x7F]/g, ""); // remove unicode characters

    setConfirmOldPass(newValue);

    if (newValue === "") {
      setConfirmOldPassError("required");
      return;
    }

    if (!confirmOldPasswordValidation(newValue)) {
      setConfirmOldPassError("password does not match");
      return;
    }

    setConfirmOldPassError("");
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
    event: React.ChangeEvent<HTMLInputElement>
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

    if (emailError || oldPasswordError || confirmOldPassError || passwordError || confirmPassError) {
      return;
    }

    try {
      const changePassPayload = {
        email: email,
        oldPassword: oldPassword,
        confirmOldPassword: confirmOldPass,
        newPassword: password,
        confirmNewPass: confirmPass,
      };
       
      const changePassResponse = await axios.post<changePassData>(
        `${baseUrl}/user/change`,
        changePassPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: axiosTimeout,
          validateStatus: (status: number) => status < 550,
        }
      );

      if (changePassResponse.data.success === false) {
        return;
      }
      setEmail("")
      setOldPassword("")
      setConfirmOldPass("")
      setPassword("");
      setConfirmPass("");
      
    } catch (error) {
      throw new Error(`error is : ${error}`);
    }
  };

  return (
    <>
      <RegisterContainer>
        <RegisterWrapper>
          <RegisterForm onSubmit={handleSubmit}>
            <RegisterHeaderWrapper>
              <RegisterHeader>Change Password</RegisterHeader>
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
            {/*old password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Old Password</RegisterLabel>
                {oldPasswordError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{oldPasswordError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon4 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="old password"
                    value={oldPassword}
                    onChange={handleOldPasswordChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*Confirm old password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Confirm old password</RegisterLabel>
                {confirmOldPassError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{confirmOldPassError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <RegisterIcon5 />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <RegisterInput
                    placeholder="Confirm-old-password"
                    value={confirmOldPass}
                    onChange={handleConfirmOldPassChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*new password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>New Password</RegisterLabel>
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
                    placeholder="new password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*Confitm new password input*/}
            <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Confirm New password</RegisterLabel>
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
                    placeholder="Confirm-new-password"
                    value={confirmPass}
                    onChange={handleConfirmPassChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
            {/*submit button */}
            <RegisterSubmitButton type="submit">Change</RegisterSubmitButton>
          </RegisterForm>
        </RegisterWrapper>
      </RegisterContainer>
    </>
  );
};

export default UserChange;
