import React, {useState} from "react";
import { Avatar, Menu, Box, Typography } from "@mui/material";
import { useAuth } from "../../Context/AuthContext";
import { ThemeColors } from "../../Core-UI/Theme";
import avatarTestImage from "../../assets/png/Person2.jpg"
import { truncate2 } from "../../Utils/truncate";

const SidebarAvatar: React.FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const { user } = useAuth();

     const open = Boolean(anchorEl);
    return (
        <>
              <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          cursor: "pointer",
          width: "73%",
          marginTop: "1rem"
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
          
        >
          H
        </Avatar>
        <Typography
          variant="body2"
          sx={{
            color: ThemeColors.text1,
            fontWeight: 500,
          }}
        >
            {truncate2(user?.userName ?? "")}
        </Typography>

        <Menu
          
          open={open}
        
          
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
        </Menu>
      </Box>
        </>
    )
}

export default SidebarAvatar