import styled from "styled-components";
import { ThemeColors } from "../../Core-UI/Theme";
import { Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { HiPlus } from "react-icons/hi";
import { SlBasket } from "react-icons/sl";
import { BiSolidCategory } from "react-icons/bi";
import { FaCommentDots, FaPhone } from "react-icons/fa";

//-------------------------------------------------------------------
// sidebar main components:
export const SidebarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  height: 100%;
  top: 0;
  z-index: 50;
  transition: 0.3s ease-in-out;
  background-color: ${ThemeColors.prime1};
  opacity: 0;
  right: -100%;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  &.open {
    opacity: 100%;
    right: 0;
  }
  @media only screen and (min-width: 280px) and (max-width: 360px) {
    width: 80%;
  }
  @media only screen and (min-width: 361px) and (max-width: 576px) {
    width: 70%;
  }
  @media only screen and (min-width: 577px) and (max-width: 768px) {
    width: 50%;
  }
  @media only screen and (min-width: 769px) and (max-width: 992px) {
    width: 30%;
  }
  @media only screen and (min-width: 993px) and (max-width: 1100px) {
    width: 20%;
  }
  @media only screen and (min-width: 1101px) {
    display: none;
  }
`;

export const SidebarWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  width: 100%;
  margin-top: 70px;
`;

//-------------------------------------------------------------------
//Sidebar search input:
export const SearchWrapper1 = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 10px;
    border: solid 2px ${ThemeColors.background};
    background-color: ${ThemeColors.prime1};
    padding: 0.35rem;
    margin-left: 2rem;
    width: 100%;
  }
  @media only screen and (min-width: 1101px) {
    display: none;
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 6px;
  cursor: pointer;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0.3rem;
  }
  @media only screen and (min-width: 577px) {
    padding: 0.4rem;
  }
`;

export const SearchIcon = styled(FiSearch)`
  color: ${ThemeColors.sec4};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 15px;
    height: 15px;
  }
  @media only screen and (min-width: 577px) {
    width: 18px;
    height: 18px;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: inherit;
  width: 100%;
  &:active {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: ${ThemeColors.text1};
    font-weight: 300;
  }

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 0.3rem;
  }
  @media only screen and (min-width: 577px) {
    padding: 0.5rem;
  }
`;
//-------------------------------------------------------------------
//Sidebar links :
export const SideLinkContainer = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

export const SideLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  margin-top: 0.5rem;
  border-radius: 8px;
  color: ${ThemeColors.text1};
  min-width: 60%;

  font-weight: 600;

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 8px 14px;
    font-size: 14px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    padding: 10px 14px;
    font-size: 16px;
  }
`;

export const SidelinkIconTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  width: 100%;
`;
export const SidelinkIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
`;
export const SidelinkTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const SidelinkText = styled.p`
  font-weight: 600;
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    font-size: 16px;
  }
`;

export const SidebarIcon1 = styled(GoHomeFill)`
  width: 22px;
  height: 22px;
`;

export const SidebarIcon2 = styled(SlBasket)`
  width: 22px;
  height: 22px;
`;

export const SidebarIcon3 = styled(BiSolidCategory)`
  width: 22px;
  height: 22px;
`;

export const SidebarIcon4 = styled(FaCommentDots)`
  width: 22px;
  height: 22px;
`;

export const SidebarIcon5 = styled(FaPhone)`
  width: 22px;
  height: 22px;
`;
//-------------------------------------------------------------------
//Sidebar signin signup btn :
export const SignInUpWrapper = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  @media only screen and (min-width: 1101px) {
    display: none;
  }
`;

export const SignInUpLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60%;
`;

export const SignInWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  width: 100%;
  background-color: ${ThemeColors.background};
  border-radius: 8px;
  border: solid 2px ${ThemeColors.prime1};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 8px 20px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    padding: 8px 20px;
  }
`;

export const SignInTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInText = styled.p`
  font-weight: 600;
  color: ${ThemeColors.text1};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    font-size: 16px;
  }
`;

export const SignInIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 4px;
  padding: 0.3rem;
  margin-right: 0.6rem;
`;

export const SignInIcon = styled(FaArrowRight)`
  height: 16px;
  color: ${ThemeColors.sec4};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    font-size: 14px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    font-size: 16px;
  }
`;

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  width: 100%;
  background-color: ${ThemeColors.background};
  border-radius: 8px;
  border: solid 2px ${ThemeColors.prime1};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    padding: 8px 20px;
  }
  @media only screen and (min-width: 577px) and (max-width: 1100px) {
    padding: 8px 20px;
  }
`;

export const SignUpIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 4px;
  padding: 0.3rem;
  margin-right: 0.6rem;
`;

export const SignUpIcon = styled(HiPlus)`
  width: 16px;
  height: 16px;
  color: ${ThemeColors.text1};
`;
