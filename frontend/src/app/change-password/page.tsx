"use client";
import React, { useState } from "react";
import { Typography, Button, Stack, TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CardWrapper from "../components/Card";

const ChangePassword = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validate = () => {
    const newErrors = {
      currentPassword: "",
      newPassword: "",
    };

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword || formData.newPassword.length < 8) {
      newErrors.newPassword = "New password must be at least 8 characters";
    }

    setError(newErrors);
    return !newErrors.currentPassword && !newErrors.newPassword;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setSuccess("Password changed successfully!");

    setTimeout(() => {
      router.push("/profile");
    }, 1500);
  };

  return (
    <CardWrapper>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Enter your current and new password to update.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb="5px">
              Current Password
            </Typography>
            <TextField
              size="small"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              error={Boolean(error.currentPassword)}
              helperText={error.currentPassword}
              fullWidth
              required
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb="5px">
              New Password
            </Typography>
            <TextField
              size="small"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              error={Boolean(error.newPassword)}
              helperText={error.newPassword}
              fullWidth
              required
            />
          </Box>

          <Button variant="contained" type="submit" fullWidth>
            Change Password
          </Button>
          {success && (
            <Typography color="success.main" textAlign="center">
              {success}
            </Typography>
          )}
        </Stack>
      </form>
    </CardWrapper>
  );
};

export default ChangePassword;
