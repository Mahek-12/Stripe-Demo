"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { baselightTheme } from "../utils/theme/DefaultColors";
import { ReactNode } from "react";
import { AlertProvider } from "./AlertProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";

const queryClient = new QueryClient();

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={baselightTheme}>
        {" "}
        <CssBaseline />
        <AlertProvider>
          <AuthProvider>{children}</AuthProvider>{" "}
        </AlertProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
