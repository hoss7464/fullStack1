import React from "react";
import { useDispatch } from "react-redux";
import { clickToggle } from "../../Redux/actions/toggleSlice";
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
  SignOutWrapper,
  SignOutIcon,
} from "./SidebarElements";

const SideUserInteraction: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth();
  //------------------------------------------------------------------------------------------------------
  //Toggle function :
  const handleToggle = () => {
    logout()
    dispatch(clickToggle("sidebar"));
  };
  //------------------------------------------------------------------------------------------------------

  return (
    <>
      <SignInUpWrapper>
        {isAuthenticated ? (
          <>
            <SignOutWrapper>
              <SignUpWrapper onClick={handleToggle}>
                <SignUpIconWrapper>
                  <SignOutIcon />
                </SignUpIconWrapper>
                <SignInTextWrapper>
                  <SignInText>Sign out</SignInText>
                </SignInTextWrapper>
              </SignUpWrapper>
            </SignOutWrapper>
          </>
        ) : (
          <>
            {" "}
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
                  <SignInText>Sign in</SignInText>
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
          </>
        )}
      </SignInUpWrapper>
    </>
  );
};

export default SideUserInteraction;
