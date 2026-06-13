import React, { useEffect } from "react";
import Alert from "@mui/joy/Alert";
import AspectRatio from "@mui/joy/AspectRatio";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import LinearProgress from "@mui/joy/LinearProgress";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Redux/store/store";
import { hideNotification } from "../../Redux/actions/notifSlice";
import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import type { IconType } from "react-icons";
import { useTranslation } from "react-i18next";

// Icon mapping based on severity
const severityIcons: Record<string, IconType> = {
  success: FaCheckCircle,
  error: FaTimesCircle,
  warning: FaExclamationTriangle,
  info: FaInfoCircle,
};

// Map your severity types to MUI's color palette
const severityToColor = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "primary",
} as const;

// Gradient backgrounds for each severity type
const severityGradients = {
  success:
    "#bdbdbd",
  error:
    "#bdbdbd",
  warning: "#bdbdbd",
  info: "#bdbdbd",
} as const;

// Custom icon colors for each severity
const severityIconColors = {
  success: "#003543", // White for success icon
  error: "#430e00", // White for error icon
  warning: "#f9a825", // White for warning icon
  info: "#1f2da8", // White for info icon
} as const;

const severityTextColors = {
  success: "#003543", // green
  error: "#430e00",   // red
  warning: "#f9a825", // yellow/orange
  info: "#1f2da8",    // blue
} as const;

const severityProgressColors = {
  success: {
    track: "#003543", // green background
    bar: "#003543",                  // green bar
  },
  error: {
    track: "#430e00",  // red background
    bar: "#430e00",                  // red bar
  },
  warning: {
    track: "#f9a825", // yellow/orange
    bar: "#f9a825",
  },
  info: {
    track: "#1f2da8", // blue
    bar: "#1f2da8",
  },
} as const;

const Notifications: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.notif.notifications
  );
  const { t } = useTranslation()

  // Title mapping based on severity ----> this is where we perform multi language
  const severityKey = {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Info",
  } as const;


  // Get all active notifications
  const activeNotifications = Object.entries(notifications)
    .filter(([_, notification]) => notification.open)
    .map(([name, notification]) => ({
      name,
      ...notification,
    }));

  useEffect(() => {
 
    const notifTime = Number(import.meta.env.VITE_APP_ERROR_TIME);
    // Set timeouts for all active notifications
    const timeouts: NodeJS.Timeout[] = [];

    activeNotifications.forEach(({ name }) => {
      const timeout = setTimeout(() => {
        dispatch(hideNotification(name));
      }, notifTime); // time to vanish

      timeouts.push(timeout);
    });

    // Clean up timeouts when component unmounts or notifications change
    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [activeNotifications, dispatch]);

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <Stack
      spacing={2}
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "45%",
          lg: "35%",
        },
        position: "fixed",
        zIndex: 9999,
        padding: "16px",
        boxSizing: "border-box",
        
      }}
    >
      {activeNotifications.map(({ name, message, severity }) => {
        const IconComponent = severityIcons[severity];
        const color = severityToColor[severity];
        const gradient = severityGradients[severity];
        const iconColor = severityIconColors[severity];
       const title = t(severityKey[severity]);
       const textColor = severityTextColors[severity];
       const progressColors = severityProgressColors[severity];

        return (
          <Alert
            key={name}
            size="lg"
            color={color}
            variant="solid"
            invertedColors
            sx={{
              background: gradient,
            
              alignItems: "flex-start",
              overflow: "hidden",
              // Ensure text remains visible against gradient background
              "& .MuiAlert-message": {
                color: "white",
              },
            }}
            startDecorator={
              <AspectRatio
                variant="solid"
                ratio="1"
                sx={{
                  minWidth: 40,
                  borderRadius: "50%",
                  boxShadow: "0 2px 12px 0 rgb(0 0 0/0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                }}
              >
                <div style={{ fontSize: "2rem", color: iconColor }}>
                  <IconComponent  />
                </div>
              </AspectRatio>
            }
            endDecorator={
              <IconButton
                variant="plain"
                sx={{
                  "--IconButton-size": "32px",
                  transform: "translate(0.5rem, -0.5rem)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                onClick={() => dispatch(hideNotification(name))}
              >
                <IoClose />
              </IconButton>
            }
          >
            <div>
              <Typography level="title-lg" sx={{ color: textColor }}>
                {title}
              </Typography>
              <Typography level="body-sm" sx={{ color: textColor }}>
                {message}
              </Typography>
            </div>
            <LinearProgress
              variant="solid"
              color={color}
              value={40}
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                borderRadius: 0,
                backgroundColor: progressColors.track,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: progressColors.bar,
                },
              }}
            />
          </Alert>
        );
      })}
    </Stack>
  );
};

export default Notifications;
