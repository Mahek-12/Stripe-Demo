"use client";

import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import withAuth from "../components/withAuth";
import CardWrapper from "../components/Card";
import { useEffect, useRef, useState } from "react";
import { useGetUser } from "../hooks/useGetUser";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useUploadProfilePicture } from "../hooks/useUploadImage";

const Home = () => {
  const { logout } = useAuth();

  const { mutate: getUser, data: user, isPending } = useGetUser();
  const { uploadProfilePicture, isUploading } = useUploadProfilePicture(() => {
    getUser();
  });

  useEffect(() => {
    getUser();
  }, [getUser]);

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profilePicture", file);

      uploadProfilePicture(formData);

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (isPending) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  const apiProfilePic = user?.user?.profilePicture
    ? `${process.env.NEXT_PUBLIC_API_URL}/${user?.user?.profilePicture.replace(
        /\\/g,
        "/"
      )}`
    : null;

  console.log("profilePic", profilePic);
  console.log("apiProfilePic", apiProfilePic);

  return (
    <CardWrapper>
      <Stack
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ height: "100%" }}
      >
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleImageChange}
          style={{ display: "none" }}
        />

        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <IconButton
              size="small"
              onClick={handleClick}
              sx={{
                border: "2px solid",
                backgroundColor: "white",
                "&:hover": {
                  backgroundColor: "white",
                  boxShadow: "none",
                },
              }}
            >
              <AddAPhotoIcon fontSize="small" />
            </IconButton>
          }
        >
          <Avatar
            src={profilePic || apiProfilePic || undefined}
            alt="Profile"
            sx={{ width: 80, height: 80 }}
          />
        </Badge>

        <Box textAlign="center">
          <Typography variant="h5" fontWeight={600}>
            Welcome, {user?.user?.name}!
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mt={1}>
            Good to see you again 👋
          </Typography>
        </Box>

        <Button variant="contained" onClick={logout} sx={{ mt: 2 }}>
          Logout
        </Button>
      </Stack>
    </CardWrapper>
  );
};

export default withAuth(Home);
