import styled from "styled-components";
import { ThemeColors } from "../../Core-UI/Theme";
import { Link } from "react-router-dom";
import { IoLogoStencil } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa6";
import { HiPlus, HiMenu } from "react-icons/hi";
import { GoHomeFill } from "react-icons/go";
import { SlBasket } from "react-icons/sl";
import { BiSolidCategory } from "react-icons/bi";
import { FaCommentDots, FaPhone } from "react-icons/fa";

//------------------------------------------------------------------------
//Navbar main warppers:
export const NavbarContainer = styled.div`
  width: 100%;
  background-color: ${ThemeColors.prime1};
  position: fixed;
  z-index: 1000;
  @media only screen and (min-width: 280px) and (max-width: 1920px) {
    padding: 0 24px 0 24px;
    height: 60px;
  }

  @media only screen and (min-width: 1921px) {
    padding: 0 232px 0 232px;
    height: 100px;
  }
`;

export const NavbarActiveArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
`;
//------------------------------------------------------------------------
//Navbar logo:
export const NavbarLeftSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const NavbarLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NavbarLogo = styled(IoLogoStencil)`
  color: ${ThemeColors.sec4};
  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 44px;
    height: 44px;
  }
  @media only screen and (min-width: 577px) {
    width: 50px;
    height: 50px;
  }
`;
//------------------------------------------------------------------------
//Navbar search :
export const SearchWrapper1 = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: none;
  }
  @media only screen and (min-width: 1101px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 55px;
    border: solid 2px ${ThemeColors.background};
    background-color: ${ThemeColors.prime1};
    padding: 0.2rem;
    margin-left: 2rem;
  }
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 50%;
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
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: inherit;
  &:active {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: ${ThemeColors.text1};
    font-weight: 300;
  }

  @media only screen and (min-width: 280px) and (max-width: 576px) {
    width: 160px;
    padding: 0.3rem;
  }
  @media only screen and (min-width: 577px) {
    width: 250px;
    padding: 0.5rem;
  }
`;
//------------------------------------------------------------------------
//Navbar links:
export const NavbarRightSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const LinkWrpper1 = styled.div`
  height: 100%;
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: none;
  }
  @media only screen and (min-width: 1101px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const Navlink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${ThemeColors.text1};
`;

export const NavbarLinkIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.background};
  border-radius: 50%;
  cursor: pointer;
  border: solid 3px ${ThemeColors.prime1};
  padding: 0.5rem;
  position: relative;
`;

export const NavbarIcon1 = styled(GoHomeFill)`
  color: ${ThemeColors.sec4};
  width: 18px;
  height: 18px;
`;

export const NavbarIcon2 = styled(SlBasket)`
  color: ${ThemeColors.sec4};
  width: 18px;
  height: 18px;
`;

export const NavbarIcon3 = styled(BiSolidCategory)`
  color: ${ThemeColors.sec4};
  width: 18px;
  height: 18px;
`;

export const NavbarIcon4 = styled(FaCommentDots)`
  color: ${ThemeColors.sec4};
  width: 18px;
  height: 18px;
`;

export const NavbarIcon5 = styled(FaPhone)`
  color: ${ThemeColors.sec4};
  width: 18px;
  height: 18px;
`;

export const NavLinkTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.3rem;
`;

export const NavLinkText = styled.p`
  color: ${ThemeColors.text1};
  font-weight: 700;
  font-size: 14px;
`;
//------------------------------------------------------------------------
//Navbar category :
export const NavCategoryWrapper = styled.div`
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: none;
  }
  @media only screen and (min-width: 1101px) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    margin-right: 1rem;
  }
`;
//------------------------------------------------------------------------
//Navbar sign in and sign up :
export const SignInUpWrapper = styled.div`
  height: 100%;
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: none;
  }
  @media only screen and (min-width: 1101px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const SignInUpLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${ThemeColors.background};
  padding: 0.2rem;
  border-radius: 8px;
  border: solid 2px ${ThemeColors.prime1};
`;

export const SignInTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
`;

export const SignInText = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${ThemeColors.text1};
`;

export const SignInIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.prime1};
  border-radius: 4px;
  padding: 0.2rem;
`;

export const SignInIcon = styled(FaArrowRight)`
  width: 16px;
  height: 16px;
  color: ${ThemeColors.sec4};
`;

export const SignUpWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${ThemeColors.prime1};
  padding: 0.2rem;
  border-radius: 8px;
  border: solid 2px ${ThemeColors.prime1};
`;

export const SignUpIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.background};
  border-radius: 4px;
  padding: 0.2rem;
`;

export const SignUpIcon = styled(HiPlus)`
  width: 16px;
  height: 16px;
  color: ${ThemeColors.text1};
`;
//------------------------------------------------------------------------
//Navbar hamburger btn:
export const HamburgerWrapper1 = styled.div`
  height: 100%;
  @media only screen and (min-width: 280px) and (max-width: 1100px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media only screen and (min-width: 1101px) {
    display: none;
  }
`;

export const HamburgerWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${ThemeColors.background};
  border-radius: 50%;
  cursor: pointer;
  border: solid 3px ${ThemeColors.prime1};
  padding: 0.6rem;
`;

export const HamburgerIcon = styled(HiMenu)`
  width: 20px;
  height: 20px;
`;
