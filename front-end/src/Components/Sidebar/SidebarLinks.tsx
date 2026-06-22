import React from "react";
import "./Sidebar.css";
import { useDispatch } from "react-redux";

import { clickToggle } from "../../Redux/actions/toggleSlice";
import { useLocation } from "react-router-dom";
import {
  SideLinkContainer,
  SideLink,
  SidelinkIconTextWrapper,
  SidelinkIconWrapper,
  SidelinkTextWrapper,
  SidelinkText,
} from "./SidebarElements";
//------------------------------------------------------------------------
interface SideItems {
  linkTo: string;
  linkPath: string;
  linkIcon: React.ReactNode;
  linkText: string;
}

interface SideItemsProp {
  links: SideItems[];
}

const SidebarLinks: React.FC<SideItemsProp> = ({ links }) => {
  const Location = useLocation();
  const dispatch = useDispatch();

  //------------------------------------------------------------------------------------------------------
  //Toggle function :
  const handleToggle = () => {
    dispatch(clickToggle("sidebar"));
  };
  //------------------------------------------------------------------------------------------------------

  return (
    <>
      <SideLinkContainer>
        {links.map((link, index) => (
          <SideLink
          key={index}
            to={link.linkTo}
            onClick={handleToggle}
            className={Location.pathname === link.linkPath ? "active-color" : undefined}
          >
            <SidelinkIconTextWrapper>
              <SidelinkIconWrapper>
                {link.linkIcon}
              </SidelinkIconWrapper>
              <SidelinkTextWrapper>
                <SidelinkText
                  className={
                    Location.pathname === link.linkPath ? "active-color" : undefined
                  }
                >
                  {link.linkText}
                </SidelinkText>
              </SidelinkTextWrapper>
            </SidelinkIconTextWrapper>
          </SideLink>
        ))}
      </SideLinkContainer>
    </>
  );
};

export default SidebarLinks;
