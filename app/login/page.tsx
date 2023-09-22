"use client";

import Link from "next/link";
import Logo from "../components/logo";
import Input from "../components/input";
import Button from "../components/button";
import Footer from "../components/footer";
import { FormEvent } from "react";
import { Login_POST } from "@/validators";

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
        <Input
          label="Email / Username"
          id="email_or_username"
          name="email_or_username"
        />
        <Input label="Password" type="password" id="password" name="password" />
        <span className="flex flex-col gap-2 mt-3">
          <Button text="Login" type="submit" />
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
