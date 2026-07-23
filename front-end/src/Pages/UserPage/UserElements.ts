import styled from "styled-components";
import { ThemeColors } from "../../Core-UI/Theme";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdOutlineSecurity } from "react-icons/md";


export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RegisterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 700px;
  background-color: inherit;
`;

export const RegisterForm = styled.form`
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
    width: 32%;
  }

  @media only screen and (min-width: 1921px) {
    border-radius: 22px;
    padding: 16px;
    width: 32%;
  }
`;

export const RegisterHeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 1rem;
`;

export const RegisterHeader = styled.p`
  font-weight: 800;
  color: ${ThemeColors.sec2};
  text-align: left;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 577px) and (max-width: 768px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 769px) and (max-width: 1080px) {
    font-size: 16px;
  }

  @media only screen and (min-width: 1081px) and (max-width: 1920px) {
    font-size: 18px;
  }

  @media only screen and (min-width: 1921px) and (max-width: 2700px) {
    font-size: 30px;
  }
`;

export const RegisterInputLabelWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const RegisterLableErrorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
`;

export const RegisterLabel = styled.label`
  color: ${ThemeColors.sec2};
  font-weight: 700;
  font-size: 14px;
`;

export const RegisterErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
`;

export const RegisterError = styled.p`
  font-size: 12px;
  font-weight: 400;
  color: red;
`;

export const RegisterInputWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  border-radius: 55px;
  background-color: ${ThemeColors.background};
  padding-top: 0.3rem;
  padding-left: 0.3rem;
  padding-bottom: 0.3rem;
  padding-right: 0.7rem;
`;

export const RegisterInputWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const RegisterInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  background-color: ${ThemeColors.background};
  color: ${ThemeColors.sec2};
  min-height: 20px;

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



  @media only screen and (min-width: 280px) and (max-width: 1080px) {
    font-size: 13px;
  }

  @media only screen and (min-width: 1081px) {
    font-size: 15px;
  }
`;

export const RegisterIconWrapper = styled.div`
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 50%;
  margin-right: 0.5rem;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    display: none;
  }
  @media only screen and (min-width: 577px) and (max-width: 768px) {
    padding: 0.3rem;
  }
  @media only screen and (min-width: 769px) {
    display: flex;
    padding: 0.4rem;
  }
`;

export const RegisterIcon1 = styled(FaUser)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const RegisterIcon2 = styled(MdEmail)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const RegisterIcon3 = styled(FaPhoneAlt)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const RegisterIcon4 = styled(RiLockPasswordFill)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const RegisterIcon5 = styled(MdOutlineSecurity)`
  width: 16px;
  height: 16px;
  @media only screen and (max-width: 768px) {
    width: 14px;
    height: 14px;
  }
`;

export const RegisterSubmitButton = styled.button`
  padding: 8px 22px;
  background-color: ${ThemeColors.sec1};
  margin-top: 1rem;
  color: ${ThemeColors.prime1};
  font-weight: 400;
  border: none;
  outline: none;
  cursor: pointer;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 100%;
    font-size: 14px;
    border-radius: 55px;
  }
  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    border-radius: 55px;
  }
  @media only screen and (min-width: 769px) {
    font-size: 16px;
    border-radius: 8px;
  }
`;

export const RegisterQuestionWrapper = styled.span`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 0.5rem;

  @media only screen and (min-width: 280px) and (max-width: 768px) {
    justify-content: center;
    font-size: 12px;
  }
  @media only screen and (min-width: 769px) {
    justify-content: flex-start;
    font-size: 14px;
  }
`;

export const RegiterLink = styled(Link)`
  color: ${ThemeColors.sec1};

  margin-left: 0.2rem;
  @media only screen and (min-width: 280px) and (max-width: 768px) {
    font-size: 12px;
  }
  @media only screen and (min-width: 769px) {
    font-size: 14px;
  }
`;

