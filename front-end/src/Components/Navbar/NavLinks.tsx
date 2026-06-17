import React from "react";
import { useDispatch } from "react-redux";
import {
  hoverEnableToggle,
  hoverDisableToggle,
} from "../../Redux/actions/toggleSlice";
import {
  LinkWrpper1,
  Navlink,
  NavbarLinkIconWrapper,
  NavLinkTextWrapper,
  NavLinkText
} from "./NavbarElements";
import Tooltip from "@mui/material/Tooltip";

//------------------------------------------------------------------------
interface LinkItem {
  to: string;
  title: string;
  icon: React.ReactNode;
  text: string;
}

interface NavLinksProps {
  links: LinkItem[];
}

const NavLinks: React.FC<NavLinksProps> = ({ links }) => {
  const dispatch = useDispatch();

  //----------------------------------------------------------------------------
  //Hover function :

  return (
    <>
      <LinkWrpper1 >
        {links.map((link, index) => (
          <Navlink key={index} to={link.to} style={{ marginRight: "1rem" }}>
            <Tooltip title={link.title} placement="bottom">
              <NavbarLinkIconWrapper
                onMouseEnter={() =>
                  dispatch(hoverEnableToggle(`toggle${index + 1}`))
                }
                onMouseLeave={() =>
                  dispatch(hoverDisableToggle(`toggle${index + 1}`))
                }
              >
               {link.icon}
              </NavbarLinkIconWrapper>
            </Tooltip>
            <NavLinkTextWrapper>
              <NavLinkText>{link.text}</NavLinkText>
            </NavLinkTextWrapper>
          </Navlink>
        ))}
      </LinkWrpper1>
    </>
  );
};

export default NavLinks;
