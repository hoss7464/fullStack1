import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import {
  UserProfileSettingContainer,
  UserProfileSettingWrapper,
  UserProfileSeetingsForm,
  UserProfileSettingPhotoIcon,
  SettingInput,
} from "./UserProfileElements";
import {
  RegisterHeaderWrapper,
  RegisterHeader,
  RegisterInputLabelWrapper,
  RegisterLableErrorWrapper,
  RegisterLabel,
  RegisterInputWrapper,
  RegisterIconWrapper,
  RegisterIcon1,
  RegisterInputWrapper2,
  RegisterInput,
  RegisterIcon2,
  RegisterIcon3,
  RegisterIcon4,
  RegisterIcon5,
  RegisterSubmitButton,
  RegisterErrorWrapper,
  RegisterError,
} from "../UserPage/UserElements";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Redux/actions/notifSlice";
//-------------------------------------------------------------------------------

interface UpdateProfileResponse {
  success: boolean;
  message: string;

  data?: {
    userName?: string;
    email?: string;
    phone?: string;
    avatar?: string;
  };
}

interface UpdateProfilePayload {
  userName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

const UserProfileSetting: React.FC = () => {
  const { user, logout } = useAuth();
  const dispatch = useDispatch();
  //States for usesrname input :
  const [username, setUsername] = useState<string>(user?.userName ?? "");
  const [usernameError, setUsernameError] = useState<string>("");
  //Email states :
  const [email, setEmail] = useState<string>(user?.email ?? "");
  const [emailError, setEmailError] = useState<string>("");
  //Phone states :
  const [phone, setPhone] = useState<string>(user?.phone ?? "");
  const [phoneError, setphoneError] = useState<string>("");
  //Password states :
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  //Confirm password states :
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");
  //Avatar states :
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarError, setAvatarError] = useState("");

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
      setPasswordError(""); // in here if user doesn't want to change empty password field , it should not show required validation because we are in setting page and filling password is sth essential
      
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
      setConfirmPassError(""); // in here if user doesn't want to change empty password field , it should not show required validation because we are in setting page and filling password is sth essential
      return;
    }

    if (!confirmPasswordValidation(newValue)) {
      setConfirmPassError("password does not match");
      return;
    }

    setConfirmPassError("");
  };
  //---------------------------------------------------------------------------
  //Avatar functions :
  /* 
  const validateAvatar = (file: File): string => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    const maxSize = 5 * 1024 * 1024; // 5 MB

    if (!allowedTypes.includes(file.type)) {
      return "Only JPG, PNG and WEBP are allowed";
    }

    if (file.size > maxSize) {
      return "Image must be smaller than 2 MB";
    }

    return "";
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setAvatar(null);
      setAvatarError("");
      return;
    }

    const error = validateAvatar(file);

    if (error) {
      setAvatar(null);
      setAvatarError(error);

      event.target.value = "";

      return;
    }

    setAvatar(file);
    setAvatarError("");
  };
  */
  //---------------------------------------------------------------------------
  const handleSettingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //if each field has earror don't send the data :
    if (
      usernameError ||
      emailError ||
      phoneError ||
      passwordError ||
      confirmPassError
    ) {
      dispatch(
        showNotification({
          name: "setting-error1",
          message: `Fields are not completed`,
          severity: "error",
        }),
      );
      return;
    }

    //make an object for payloads :
    const payload: UpdateProfilePayload = {};
    let hasChanges = false;

    //condition for username :
    if (username !== user?.userName) {
      payload.userName = username;
      hasChanges = true;
    }
    //condition for email :
    if (email !== user?.email) {
      payload.email = email;
      hasChanges = true;
    }
    //condition for phone :
    if (phone !== user?.phone) {
      payload.phone = phone;
      hasChanges = true;
    }
    //condition for password and confirmPass:
    if (password !== "" && confirmPass !== "" && password === confirmPass) {
      payload.password = password;
      payload.confirmPassword = confirmPass;
      hasChanges = true;
    }

     if (password !== "" && confirmPass === "") {
      dispatch(
        showNotification({
          name: "setting-error7",
          message: "Fill confirm password.",
          severity: "error",
        }),
      );
      return;
     }
    //if hasChanges is false :
    if (!hasChanges) {
      dispatch(
        showNotification({
          name: "setting-error2",
          message: "No changes detected.",
          severity: "error",
        }),
      );
      return;
    }
   
    try {
      const settingResponse = await axios.post<UpdateProfileResponse>(
        `${baseUrl}/user/change`,
        payload,
        {
          withCredentials: true,
          timeout: Number(axiosTimeout),
        },
      );

      if (settingResponse.data.success === false) {
        dispatch(
          showNotification({
            name: "settin-error5",
            message: `There was an error in sending data`,
            severity: "error",
          }),
        );
        return;
      }

      dispatch(
        showNotification({
          name: "settings-success",
          message: "Profile updated successfully.",
          severity: "success",
        }),
      );
      //Log out after successful changes in setting form :
      logout()
    } catch (error) {
      dispatch(
        showNotification({
          name: "Setting-error4",
          message: `${error}`,
          severity: "error",
        }),
      );
      return;
    }
  };

  return (
    <>
      <UserProfileSettingContainer>
        <UserProfileSettingWrapper>
          <UserProfileSeetingsForm onSubmit={handleSettingSubmit}>
            <RegisterHeaderWrapper>
              <RegisterHeader>Settings</RegisterHeader>
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
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>
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
            {/*Photo upload input*/}
            {/* <RegisterInputLabelWrapper>
              <RegisterLableErrorWrapper>
                <RegisterLabel>Photo</RegisterLabel>
                {avatarError && (
                  <RegisterErrorWrapper>
                    <RegisterError>{avatarError}</RegisterError>
                  </RegisterErrorWrapper>
                )}
              </RegisterLableErrorWrapper>
              <RegisterInputWrapper>
                <RegisterIconWrapper>
                  <UserProfileSettingPhotoIcon />
                </RegisterIconWrapper>
                <RegisterInputWrapper2>
                  <SettingInput
                    placeholder="Avatar"
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleAvatarChange}
                  />
                </RegisterInputWrapper2>
              </RegisterInputWrapper>
            </RegisterInputLabelWrapper>*/}

            {/*submit button */}
            <RegisterSubmitButton type="submit">Submit</RegisterSubmitButton>
          </UserProfileSeetingsForm>
        </UserProfileSettingWrapper>
      </UserProfileSettingContainer>
    </>
  );
};

export default UserProfileSetting;
