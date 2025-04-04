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

const Login = () => {
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
      router.push("/products");
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
              Sign In
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack>
                <Box>
                  <Typography variant="subtitle2" fontWeight={500} mb="5px">
                    Username
                  </Typography>
                  <TextField
                    id="username"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.email}
                    disabled // using for now only
                  />
                </Box>

                <Box mt="25px">
                  <Typography variant="subtitle2" fontWeight={500} mb="5px">
                    Password
                  </Typography>
                  <TextField
                    id="password"
                    type="password"
                    size="small"
                    variant="outlined"
                    fullWidth
                    value={formData.password}
                    disabled // using for now only
                  />
                </Box>

                <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  my={2}
                >
                  <Typography
                    component={Link}
                    href="/"
                    fontWeight="500"
                    sx={{ textDecoration: "none", color: "primary.main" }}
                  >
                    Forgot Password?
                  </Typography>
                </Stack>
              </Stack>

              <Box>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                >
                  Sign In
                </Button>
              </Box>
            </form>

            <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
              <Typography
                color="textSecondary"
                variant="subtitle1"
                fontWeight="500"
              >
                New to Demo?
              </Typography>
              <Typography
                component={Link}
                href="/register"
                fontWeight="500"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Create an account
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
