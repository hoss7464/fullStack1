import styled from "styled-components";
import { ThemeColors } from "../../Core-UI/Theme";
import { MdAddAPhoto } from "react-icons/md";

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-color: ${ThemeColors.background};
`;

export const ProfileTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ProfileTextWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const ProfileText = styled.p`
  font-size: 16px;
  font-weight: 600;
`;
//-----------------------------------------------------------------------
//User profile setting :
export const UserProfileSettingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 700px;
  background-color: ${ThemeColors.background};
`;

export const UserProfileSettingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const UserProfileSeetingsForm = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background-color: ${ThemeColors.prime1};

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    border-radius: 14px;
    padding: 6px;
    width: 100%;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    border-radius: 14px;
    padding: 12px;
    width: 100%;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    border-radius: 14px;
    padding: 16px;
    width: 100%;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    border-radius: 18px;
    padding: 16px;
    width: 60%;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 22px;
    padding: 16px;
    width: 60%;
  }
`;

export const UserProfileSettingPhotoIcon = styled(MdAddAPhoto)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const chooseFileButtonWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

export const SettingInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${ThemeColors.background};
  color: ${ThemeColors.sec2};
  min-height: 20px;
  direction: rtl;

  &:active {
    border: none;
    outline: none;
  }

  &:hover {
    border: none;
    outline: none;
  }
  &::placeholder {
    font-size: 13px;
    color: ${ThemeColors.text2};
  }

  &::file-selector-button {
    background-color: ${ThemeColors.prime1};
    color: ${ThemeColors.text1};
    font-size: 14px;
    border: none;
    border-radius: 50px;
    padding: 4px 8px;
    direction: ltr;
    cursor: pointer;
    margin-left: 0.5rem;
  }

  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 15px;
  }
`;