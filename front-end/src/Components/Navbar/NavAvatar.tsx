import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { Avatar, Menu, MenuItem, Box, Typography } from "@mui/material";
import { ThemeColors } from "../../Core-UI/Theme";
import { SignInUpLink, SignInTextWrapper, SignInText } from "./NavbarElements";
import avatarTestImage from "../../assets/png/Person2.jpg";
import { truncate2 } from "../../Utils/truncate";

const NavAvatar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout, user } = useAuth();

  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
        }}
      >
        <Avatar
          src={avatarTestImage}
          alt={user?.userName}
          sx={{
            cursor: "pointer",
            width: 35,
            height: 35,
            backgroundColor: `${ThemeColors.background}`,
            color: `${ThemeColors.text1}`,
          }}
          onMouseEnter={handleMouseEnter}
        >
          H
        </Avatar>
        <Typography
          variant="body2"
          sx={{
            color: ThemeColors.text1,
            fontWeight: 500,
          }}
          onMouseEnter={handleMouseEnter}
        >
            {truncate2(user?.userName ?? "")}
        </Typography>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMouseLeave}
          MenuListProps={{
            onMouseLeave: handleMouseLeave,
            onMouseEnter: () => setAnchorEl(anchorEl),
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem>
            <SignInUpLink to="/userProfile">
              <SignInTextWrapper>
                <SignInText>Profile</SignInText>
              </SignInTextWrapper>
            </SignInUpLink>
          </MenuItem>

          <MenuItem>
            <SignInUpLink to="/userProfileSetting">
              <SignInTextWrapper>
                <SignInText>Settings</SignInText>
              </SignInTextWrapper>
            </SignInUpLink>
          </MenuItem>

          <MenuItem onClick={() => logout()}>
            <SignInTextWrapper>
              <SignInText>Logout</SignInText>
            </SignInTextWrapper>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};

export default NavAvatar;
