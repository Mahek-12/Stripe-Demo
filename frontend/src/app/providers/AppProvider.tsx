"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { baselightTheme } from "../utils/theme/DefaultColors";
import { ReactNode } from "react";

export default function AppProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={baselightTheme}>
      {" "}
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
