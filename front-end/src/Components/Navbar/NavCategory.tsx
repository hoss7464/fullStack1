import React from "react";
import { useDispatch } from "react-redux";
import {
  hoverEnableToggle,
  hoverDisableToggle,
} from "../../Redux/actions/toggleSlice";
import {
  NavCategoryWrapper,
  Navlink,
  NavbarLinkIconWrapper,
  NavbarIcon3,
} from "./NavbarElements";
import Tooltip from "@mui/material/Tooltip";

const NavCategory: React.FC = () => {
  const dispatch = useDispatch();
  //Hover function :
  const HoverMouseEnter = (id: string) => {
    dispatch(hoverEnableToggle(id));
  };
  const HoverMouseLeave = (id: string) => {
    dispatch(hoverDisableToggle(id));
  };
  return (
    <>
      {/*we must wrapp two components below so that when we hover over category area it remains visible **/}
      <NavCategoryWrapper
        onMouseEnter={() => HoverMouseEnter("toggle3")}
        onMouseLeave={() => HoverMouseLeave("toggle3")}
      >
        <Tooltip title="Category" placement="bottom">
          <NavbarLinkIconWrapper>
            <NavbarIcon3 />
          </NavbarLinkIconWrapper>
        </Tooltip>
      </NavCategoryWrapper>
    </>
  );
};

export default NavCategory;
