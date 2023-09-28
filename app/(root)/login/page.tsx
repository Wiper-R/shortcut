"use client";

import Footer from "@/components/Shared/Footer";
import PlainNavbar from "@/components/Shared/PlainNavbar";
import LoginForm from "@/components/LoginForm";
import AuthGuard from "@/components/AuthGuard";

export default function Login() {
  return (
    <AuthGuard redirectAuthenticated="/dashboard/">
      <PlainNavbar />
      <LoginForm />
      <Footer />
    </AuthGuard>
  );
}
