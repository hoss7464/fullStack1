import React from "react";
import {
  NavbarContainer,
  NavbarActiveArea,
  NavbarLeftSection,
  NavbarRightSection,
    NavbarIcon1,
  NavbarIcon2,
  NavbarIcon4,
  NavbarIcon5,
} from "./NavbarElements";
import NavLogo from "./NavLogo";
import NavSearchInput from "./NavSearchInput";
import NavLinks from "./NavLinks";
import NavCategory from "./NavCategory";
import NavUserInteraction from "./NavUserInteraction";
import NavHamburger from "./NavHamburger";

const Navbar: React.FC = () => {
  return (
    <>
      <NavbarContainer>
        <NavbarActiveArea>
          {/*------------------Navbar left section-------------------*/}
          <NavbarLeftSection>
            {/*Navbar Logo*/}
            <NavLogo />
            {/*Navbar search input*/}
            <NavSearchInput />
          </NavbarLeftSection>
          {/*------------------Navbar right section-------------------*/}
          <NavbarRightSection >
            {/*Navbar Links*/}
            <NavLinks 
              links={[
                {
                  to: "/",
                  title: "Home",
                  icon: <NavbarIcon1 />,
                  text: "Home"
                },
                {
                  to: "/purchase",
                  title: "Purchase",
                  icon: <NavbarIcon2 />,
                  text: "Purchase"
                },
                {
                  to: "/about",
                  title: "About",
                  icon: <NavbarIcon4 />,
                  text: "About"
                },
                {
                  to: "/services",
                  title: "Services",
                  icon: <NavbarIcon5 />,
                  text: "Services"
                },
              ]}
            />
            {/*Navbar category*/}
            <NavCategory />
            {/*Navbar sign up and sign in*/}
            <NavUserInteraction />
            {/*Navbar hamburger btn*/}
            <NavHamburger />
          </NavbarRightSection>
        </NavbarActiveArea>
      </NavbarContainer>
    </>
  );
};

export default Navbar;
