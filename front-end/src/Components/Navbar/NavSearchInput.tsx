import React from "react";
import {
  SearchWrapper1,
  SearchIconWrapper,
  SearchIcon,
  SearchInputWrapper,
  SearchInput,
} from "./NavbarElements";

const NavSearchInput: React.FC = () => {
  return (
    <>
      <SearchWrapper1>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <SearchInputWrapper>
          <SearchInput placeholder="search" value="" />
        </SearchInputWrapper>
      </SearchWrapper1>
    </>
  );
};

export default NavSearchInput;
