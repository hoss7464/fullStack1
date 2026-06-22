import React from "react";
import { useDispatch } from "react-redux";
import { clickToggle } from "../../Redux/actions/toggleSlice";
import {
  SignInUpWrapper,
  SignInUpLink,
  SignInWrapper,
  SignInTextWrapper,
  SignInText,
  SignInIconWrapper,
  SignInIcon,
  SignUpWrapper,
  SignUpIconWrapper,
  SignUpIcon,
} from "./SidebarElements";

const SideUserInteraction: React.FC = () => {
  const dispatch = useDispatch();

  //------------------------------------------------------------------------------------------------------
  //Toggle function :
  const handleToggle = () => {
    dispatch(clickToggle("sidebar"));
  };
  //------------------------------------------------------------------------------------------------------

  return (
    <>
      <SignInUpWrapper>
        <SignInUpLink
          to="/userLogin"
          style={{ marginBottom: "1rem" }}
          onClick={handleToggle}
        >
          <SignInWrapper>
            <SignInIconWrapper>
              <SignInIcon />
            </SignInIconWrapper>
            <SignInTextWrapper>
              <SignInText>Log In</SignInText>
            </SignInTextWrapper>
          </SignInWrapper>
        </SignInUpLink>

        <SignInUpLink to="/userRegister" onClick={handleToggle}>
          <SignUpWrapper>
            <SignUpIconWrapper>
              <SignUpIcon />
            </SignUpIconWrapper>
            <SignInTextWrapper>
              <SignInText>Sign Up</SignInText>
            </SignInTextWrapper>
          </SignUpWrapper>
        </SignInUpLink>
      </SignInUpWrapper>
    </>
  );
};

export default SideUserInteraction;
