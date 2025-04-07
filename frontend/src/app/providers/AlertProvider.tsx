"use client";
import React, { createContext, useContext, useState } from "react";
import { Alert, Stack, Slide } from "@mui/material";

type AlertType = "success" | "error";

interface AlertState {
  message: string;
  severity: AlertType;
}

interface AlertContextType {
  onSuccessAlert: (msg: string) => void;
  onErrorAlert: (msg: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showAlert = (message: string, severity: AlertType) => {
    setAlert({ message, severity });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        onSuccessAlert: (msg) => showAlert(msg, "success"),
        onErrorAlert: (msg) => showAlert(msg, "error"),
      }}
    >
      {children}

      {alert && (
        <Slide direction="down" in mountOnEnter unmountOnExit>
          <Stack
            sx={{
              position: "fixed",
              top: 20,
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 1400,
              width: "auto",
              minWidth: "300px",
              maxWidth: "80vw",
            }}
          >
            <Alert severity={alert.severity} variant="filled">
              {alert.message}
            </Alert>
          </Stack>
        </Slide>
      )}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};
