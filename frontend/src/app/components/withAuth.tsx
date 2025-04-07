// src/components/withAuth.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.replace("/");
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) return null; // or loader

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
