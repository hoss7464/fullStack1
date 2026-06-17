import React from "react";
import { useDispatch } from "react-redux";
import { clickToggle } from "../../Redux/actions/toggleSlice";
import {
  HamburgerWrapper1,
  HamburgerWrapper2,
  HamburgerIcon,
} from "./NavbarElements";

const NavHamburger: React.FC = () => {
  const dispatch = useDispatch();
  return (
    <>
      <HamburgerWrapper1 onClick={() => dispatch(clickToggle("sidebar"))}>
        <HamburgerWrapper2>
          <HamburgerIcon />
        </HamburgerWrapper2>
      </HamburgerWrapper1>
    </>
  );
};

export default NavHamburger;
