import React from "react";
import { useAuth } from "../../Context/AuthContext";
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
  SignOutSettingWrapper,
  AvatarWrapper,
} from "./NavbarElements";
import NavAvatar from "./NavAvatar";

const NavUserInteraction: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <SignInUpWrapper>
        {isAuthenticated ? (
          <>
            <SignOutSettingWrapper>
              <AvatarWrapper>
                <NavAvatar />
              </AvatarWrapper>
            </SignOutSettingWrapper>
          </>
        ) : (
          <>
            <SignInUpLink to="/userLogin" style={{ marginRight: "0.5rem" }}>
              <SignInWrapper>
                <SignInTextWrapper>
                  <SignInText>Sign in</SignInText>
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
          </>
        )}
      </SignInUpWrapper>
    </>
  );
};

export default NavUserInteraction;
