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
  SignOutIcon,
  NavbarLinkIconWrapper,
  SettingIcon,
  UserIcon,
} from "./NavbarElements";
import Tooltip from "@mui/material/Tooltip";

const NavUserInteraction: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <>
      <SignInUpWrapper>
        {isAuthenticated ? (
          <>
            <SignOutSettingWrapper>
              <Tooltip title="Settings" placement="bottom">
                <SignInUpLink
                  to="/userProfileSetting"
                  style={{ marginRight: "1rem" }}
                >
                  <NavbarLinkIconWrapper>
                    <SettingIcon />
                  </NavbarLinkIconWrapper>
                </SignInUpLink>
              </Tooltip>

              <Tooltip title="User" placement="bottom">
                <SignInUpLink to="/userProfile" style={{ marginRight: "1rem" }}>
                  <NavbarLinkIconWrapper>
                    <UserIcon />
                  </NavbarLinkIconWrapper>
                </SignInUpLink>
              </Tooltip>

              <Tooltip title="Sign out" placement="bottom">
                <NavbarLinkIconWrapper onClick={() => logout()}>
                  <SignOutIcon />
                </NavbarLinkIconWrapper>
              </Tooltip>
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
