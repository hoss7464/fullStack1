import React from "react";
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
} from "./NavbarElements";

const NavUserInteraction: React.FC = () => {
  return (
    <>
      <SignInUpWrapper>
        <SignInUpLink to="/userLogin" style={{ marginRight: "0.5rem" }}>
          <SignInWrapper>
            <SignInTextWrapper>
              <SignInText>Log In</SignInText>
            </SignInTextWrapper>
            <SignInIconWrapper>
              <SignInIcon />
            </SignInIconWrapper>
          </SignInWrapper>
        </SignInUpLink>

        <SignInUpLink to="/userRegister">
          <SignUpWrapper>
            <SignInTextWrapper>
              <SignInText>Sign Up</SignInText>
            </SignInTextWrapper>
            <SignUpIconWrapper>
              <SignUpIcon />
            </SignUpIconWrapper>
          </SignUpWrapper>
        </SignInUpLink>
      </SignInUpWrapper>
    </>
  );
};

export default NavUserInteraction;
