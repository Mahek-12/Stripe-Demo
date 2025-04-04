"use client";

import { useEffect } from "react";
import { Box, Typography } from "@mui/material";

const products = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/pricing-table.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h1" sx={{ mt: 6 }}>
          Online Courses
        </Typography>
      </Box>
      <Box sx={{ mt: 6 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: `
            <stripe-pricing-table
              pricing-table-id="prctbl_1R7b9qPxS1kAZe3ROB2Qneqo"
              publishable-key="${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}">
            </stripe-pricing-table>
          `,
          }}
        />
      </Box>
    </>
  );
};

export default products;
