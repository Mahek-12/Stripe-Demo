"use client";
import React, { useState } from "react";
import { Typography, Button, Stack, TextField, Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CardWrapper from "../components/Card";

const Register = () => {
  const router = useRouter();

  const [formData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    password: "Test@1234",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);

    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <CardWrapper>
      <Typography fontWeight="700" variant="h4" mb={1} textAlign="center">
        Sign Up
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack mb={3}>
          <Typography
            variant="subtitle2"
            fontWeight={500}
            component="label"
            htmlFor="name"
            mb="5px"
          >
            Name
          </Typography>
          <TextField
            id="name"
            size="small"
            variant="outlined"
            value={formData.name}
            fullWidth
            required
            disabled // using dummy for now
          />

          <Typography
            variant="subtitle2"
            fontWeight={500}
            component="label"
            htmlFor="email"
            mb="5px"
            mt="25px"
          >
            Email Address
          </Typography>
          <TextField
            id="email"
            size="small"
            variant="outlined"
            fullWidth
            required
            value={formData.email}
            disabled
          />

          <Typography
            variant="subtitle2"
            fontWeight={500}
            component="label"
            htmlFor="password"
            mb="5px"
            mt="25px"
          >
            Password
          </Typography>
          <TextField
            id="password"
            size="small"
            required
            variant="outlined"
            fullWidth
            value={formData.password}
            disabled
          />
        </Stack>

        <Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </form>

      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Typography color="textSecondary" variant="subtitle1" fontWeight="500">
          Already have an Account?
        </Typography>
        <Typography
          component={Link}
          href="/login"
          fontWeight="500"
          sx={{ textDecoration: "none", color: "primary.main" }}
        >
          Sign In
        </Typography>
      </Stack>
    </CardWrapper>
  );
};

export default Register;
