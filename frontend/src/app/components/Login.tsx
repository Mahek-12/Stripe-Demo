"use client";
import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  loginSchema,
  loginSchemaDefaultValues,
} from "../lib/schemas/loginSchema";
import { useLogin } from "../hooks/useLogin";
import CardWrapper from "../components/Card";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: loginSchemaDefaultValues,
  });

  const { loginMutation, isPending } = useLogin();

  const onSubmit = (data: { email: string; password: string }) => {
    loginMutation(data);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <CardWrapper>
      <Typography fontWeight="700" variant="h4" mb={1} textAlign="center">
        Sign In
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Box>
            <Typography variant="subtitle2" fontWeight={500} mb="5px">
              Email
            </Typography>
            <TextField
              id="email"
              size="small"
              variant="outlined"
              fullWidth
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

          <Box mt="25px">
            <Typography variant="subtitle2" fontWeight={500} mb="5px">
              Password
            </Typography>
            <TextField
              id="password"
              type={showPassword ? "text" : "password"}
              size="small"
              variant="outlined"
              fullWidth
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
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
              href="/forgot-password"
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
            disabled={isPending}
            startIcon={isPending && <CircularProgress size={20} />}
          >
            Sign In
          </Button>
        </Box>
      </form>

      <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
        <Typography color="textSecondary" variant="subtitle1" fontWeight="500">
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
    </CardWrapper>
  );
};

export default Login;
