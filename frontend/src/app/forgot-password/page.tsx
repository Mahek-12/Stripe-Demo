// "use client";
// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Button,
//   Stack,
//   TextField,
//   Card,
//   Grid2 as Grid,
// } from "@mui/material";

// import { useRouter } from "next/navigation";

// const ForgotPassword = () => {
//   const router = useRouter();

//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation (you can replace with zod on the frontend later)
//     if (!email) {
//       setError("Email is required");
//       setSuccess("");
//       return;
//     }

//     // Simulate success (replace this with actual API call later)
//     setError("");
//     setSuccess("Password reset link sent to your email");

//     // Optionally redirect or reset form
//     setTimeout(() => {
//       router.push("/login");
//     }, 1500);
//   };

//   return (
//     <Box
//       sx={{
//         position: "relative",
//         "&:before": {
//           content: '""',
//           background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
//           backgroundSize: "400% 400%",
//           animation: "gradient 15s ease infinite",
//           position: "absolute",
//           height: "100%",
//           width: "100%",
//           opacity: "0.3",
//         },
//       }}
//     >
//       <Grid
//         container
//         spacing={0}
//         justifyContent="center"
//         sx={{ height: "100vh" }}
//       >
//         <Grid
//           size={{ xs: 12, lg: 4, xl: 3, sm: 12 }}
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <Card
//             elevation={3}
//             sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
//           >
//             <Typography variant="h5" gutterBottom>
//               Forgot Password
//             </Typography>
//             <Typography variant="body2" color="text.secondary" mb={3}>
//               Enter your email and we’ll send you a password reset link.
//             </Typography>
//             <form onSubmit={handleSubmit}>
//               <Stack spacing={2}>
//                 <TextField
//                   label="Email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   error={Boolean(error)}
//                   helperText={error}
//                   fullWidth
//                   required
//                 />
//                 <Button variant="contained" type="submit" fullWidth>
//                   Send Reset Link
//                 </Button>
//                 {success && (
//                   <Typography color="success.main" textAlign="center">
//                     {success}
//                   </Typography>
//                 )}
//               </Stack>
//             </form>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ForgotPassword;

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
