"use client";

import { Button } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import withAuth from "../components/withAuth";

const Home = () => {
  const { logout } = useAuth();
  return (
    <>
      <h1>Hello</h1>
      <Button variant="contained" color="error" onClick={logout} sx={{ mt: 2 }}>
        Logout
      </Button>
    </>
  );
};

export default withAuth(Home);
