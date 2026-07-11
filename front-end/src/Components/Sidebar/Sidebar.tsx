import React from "react";
import "./Sidebar.css";
import { useSelector} from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { useAuth } from "../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import {
  SidebarContainer,
  SidebarWrapper,
  SidebarIcon1,
  SidebarIcon2,
  SidebarIcon3,
  SidebarIcon4,
  SidebarIcon6,
 SidebarIcon7,

} from "./SidebarElements";
import SideSearchInput from "./SideSearchInput";
import SidebarLinks from "./SidebarLinks";
import SideUserInteraction from "./SideUserInteraction";
import SidebarAvatar from "./SidebarAvatar";


const Sidebar: React.FC = () => {
  const Location = useLocation();
  const isOpen = useSelector((state: RootState) => state.toggle.toggles["sidebar"] || false);
  const {isAuthenticated} = useAuth()

  return (
    <>
      <SidebarContainer className={isOpen ? "open" : ""}>
        <SidebarWrapper>
          {/*Sidebar search input */}
          <SideSearchInput />
          {/*Sidebar avatar */}
          {isAuthenticated ? <SidebarAvatar /> : null}
          {/*Sidebar links */}
          <SidebarLinks
            links={[
              {
                linkTo: "/",
                linkIcon: <SidebarIcon1 className={Location.pathname === "/" ? "active-color2" : undefined} />,
                linkPath: "/",
                linkText: "Home",
              },
              {
                linkTo: "/purchase",
                linkIcon: <SidebarIcon2 className={Location.pathname === "/purchase" ? "active-color2" : undefined} />,
                linkPath: "/purchase",
                linkText: "Purchase",
              },
              {
                linkTo: "/about",
                linkIcon: <SidebarIcon3 className={Location.pathname === "/about" ? "active-color2" : undefined} />,
                linkPath: "/about",
                linkText: "About",
              },
              {
                linkTo: "/services",
                linkIcon: <SidebarIcon4 className={Location.pathname === "/services" ? "active-color2" : undefined} />,
                linkPath: "/services",
                linkText: "Services",
              },
              {
                linkTo: "/userProfileSetting",
                linkIcon: <SidebarIcon6 className={Location.pathname === "/userProfileSetting" ? "active-color2" : undefined} />,
                linkPath: "/userProfileSetting",
                linkText: "Settings",
              },
              {
                linkTo: "/userProfile",
                linkIcon: <SidebarIcon7 className={Location.pathname === "/userProfile" ? "active-color2" : undefined} />,
                linkPath: "/userProfile",
                linkText: "Profile",
              },
            ]}
          />
          {/*Sidebar signin signup btn */}
          <SideUserInteraction />
        </SidebarWrapper>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
