import React from "react";
import {
  ProfileContainer,
  ProfileTextWrapper,
  ProfileTextWrapper2,
  ProfileText,
} from "./UserProfileElements";
import { useAuth } from "../../Context/AuthContext";

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  return (
    <>
      <ProfileContainer>
        <ProfileTextWrapper>
          <ProfileTextWrapper2>
            <ProfileText>username : {user?.userName}</ProfileText>
          </ProfileTextWrapper2>

          <ProfileTextWrapper2>
            <ProfileText>email : {user?.email} </ProfileText>
          </ProfileTextWrapper2>

          <ProfileTextWrapper2>
            <ProfileText>phone : {user?.phone}</ProfileText>
          </ProfileTextWrapper2>

          <button onClick={() => logout()}>log out</button>
        </ProfileTextWrapper>
      </ProfileContainer>
    </>
  );
};

export default UserProfile;
