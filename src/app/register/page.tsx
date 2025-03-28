"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  Card,
  Grid2 as Grid,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
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
    <Box
      sx={{
        position: "relative",
        "&:before": {
          content: '""',
          background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
          backgroundSize: "400% 400%",
          animation: "gradient 15s ease infinite",
          position: "absolute",
          height: "100%",
          width: "100%",
          opacity: "0.3",
        },
      }}
    >
      <Grid
        container
        spacing={0}
        justifyContent="center"
        sx={{ height: "100vh" }}
      >
        <Grid
          size={{ xs: 12, lg: 4, xl: 3, sm: 12 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={2}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            <Typography fontWeight="700" variant="h2" mb={1} textAlign="center">
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
                  disabled // using for now only
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
                  value={formData.name}
                  disabled // using for now only
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
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  disabled // using for now only
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
              <Typography
                color="textSecondary"
                variant="subtitle1"
                fontWeight="500"
              >
                Already have an Account?
              </Typography>
              <Typography
                component={Link}
                href="/"
                fontWeight="500"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Sign In
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
