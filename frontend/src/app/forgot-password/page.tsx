"use client";
import React, { useState } from "react";
import { Typography, Button, Stack, TextField, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import CardWrapper from "../components/Card";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      setSuccess("");
      return;
    }

    setError("");
    setSuccess("Password reset link sent to your email");

    setTimeout(() => {
      router.push("/login");
    }, 1500);
  };

  return (
    <CardWrapper>
      <Typography variant="h5" gutterBottom>
        Forgot Password
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Enter your email and we’ll send you a password reset link.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb="5px">
              Email Address
            </Typography>
            <TextField
              label="Email"
              type="email"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(error)}
              helperText={error}
              fullWidth
              required
            />
          </Box>

          <Button variant="contained" type="submit" fullWidth>
            Send Reset Link
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

export default ForgotPassword;
