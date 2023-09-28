"use client";

import Footer from "@/components/Shared/Footer";
import PlainNavbar from "@/components/Shared/PlainNavbar";
import LoginForm from "@/components/LoginForm";
import AuthValidator from "@/components/AuthValidator";

export default function Login() {
  return (
    <AuthValidator redirectAuthenticated="/dashboard/">
      <PlainNavbar />
      <LoginForm />
      <Footer />
    </AuthValidator>
  );
}
