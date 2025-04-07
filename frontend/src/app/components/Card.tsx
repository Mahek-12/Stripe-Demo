"use client";
import React from "react";
import { Box, Card, Grid2 as Grid } from "@mui/material";

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
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
          size={{ xs: 12, sm: 12, lg: 4, xl: 3 }}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Card
            elevation={3}
            sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
          >
            {children}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CardWrapper;
