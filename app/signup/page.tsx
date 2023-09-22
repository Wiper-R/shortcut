"use client";

import Link from "next/link";
import Logo from "../components/logo";
import Input from "../components/input";
import Button from "../components/button";
import Footer from "../components/footer";
import { FormEvent, useRef } from "react";
import { SignUp_POST } from "@/validators";

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

export default function SignUp() {
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await SignUp_POST.validateAsync(
      Object.fromEntries(formData.entries())
    );

    const _resp = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(result),
    });
  }

  return (
    <>
      <Navbar />
      <form
        className="flex flex-col p-4 box-border gap-y-5 my-8 md:my-14 md:max-w-xl mx-auto md:p-8 md:bg-white md:rounded-xl md:shadow-md w-full"
        onSubmit={onSubmit}
      >
        <span className="mb-5">
          <h4 className="text-center text-3xl font-semibold text-gray-700">
            Create an account
          </h4>
          <hr className="h-0.5 bg-gray-300 mt-1.5" />
        </span>
        <Input label="Email" type="email" id="email" name="email" />
        <Input label="Username" type="text" id="username" name="username" />
        <span>
          <Input
            label="Password"
            type="password"
            id="password"
            name="password"
          />
          <span className="mt-2 text-gray-600 block">
            <span>A strong password must contain:</span>
            <ul className="ml-6 list-disc">
              <li>1 uppercase letter</li>
              <li>1 lowercase letter</li>
              <li>1 number</li>
              <li>1 special character</li>
              <li>6 or more characters</li>
            </ul>
          </span>
        </span>
        <span className="flex flex-col gap-2">
          <Button text="Create account" type="submit" />
          <span className="text-center text-gray-600">
            already have an account?{" "}
            <Link href="/login" className="text-primary">
              login
            </Link>
          </span>
        </span>
      </form>
      <Footer />
    </>
  );
}
