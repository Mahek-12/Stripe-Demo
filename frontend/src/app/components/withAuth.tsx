"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (Component: React.ComponentType<any>) => {
  const AuthenticatedComponent = (props: any) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.push("/");
      }
    }, [loading, isAuthenticated, router]);

    if (loading) return null;

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
