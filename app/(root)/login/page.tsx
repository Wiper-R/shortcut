"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { Login_POST } from "@/validators";
import FormSubmitSubmit from "@/components/Client/Shared/FormSubmit";
import Logo from "@/components/Server/Shared/Logo";
import Footer from "@/components/Server/Shared/Footer";
import FormInput from "@/components/Client/Shared/FormInput";

const Navbar = () => {
  return (
    <nav
      className={`px-5 py-4 w-full md:px-12 xl:px-36 
        bg-[#F5F4F4]
      `}
    >
      <Link href="/">
        <Logo />
      </Link>
    </nav>
  );
};

export default function Login() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await Login_POST.validateAsync(
      Object.fromEntries(formData.entries())
    );

    const _resp = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(result),
    });
  }

  return (
    <>
      <Navbar />
      <form
        action=""
        className="flex flex-col p-4 box-border gap-y-5 my-8 md:my-14 md:max-w-xl mx-auto md:p-8 md:bg-white md:rounded-xl md:shadow-md w-full"
        onSubmit={handleSubmit}
      >
        <span className="mb-5">
          <h4 className="text-center text-3xl font-semibold text-gray-700">
            Login
          </h4>
          <hr className="h-0.5 bg-gray-300 mt-1.5" />
        </span>
        <FormInput
          label="Email / Username"
          id="email_or_username"
          name="email_or_username"
        />
        <FormInput label="Password" type="password" id="password" name="password" />
        <span className="flex flex-col gap-2 mt-3">
          <FormSubmitSubmit>Login</FormSubmitSubmit>
          <span className="text-center text-gray-600">
            don't have an account?{" "}
            <Link href="/signup" className="text-primary">
              sign up
            </Link>
          </span>
        </span>
      </form>
      <Footer />
    </>
  );
}
