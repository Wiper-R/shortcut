"use client";

import { FormEvent } from "react";
import BaseAuthForm from "./BaseAuthForm";
import FormInput from "./Shared/FormInput";
import FormSubmit from "./Shared/FormSubmit";
import Link from "next/link";
import { Login_POST } from "@/validators";
import useAuthContext from "@/hooks/useAuthContext";

const LoginForm = () => {
  const { dispatch } = useAuthContext();
  const OnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await Login_POST.validateAsync(
      Object.fromEntries(formData.entries())
    );

    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(result),
    });

    if (res.ok) {
      dispatch({ type: "LOGIN_SUCCESS", payload: await res.json() });
    } else {
      dispatch({ type: "LOGIN_FAILED", payload: null });
    }
  };
  return (
    <BaseAuthForm onSubmit={OnSubmit}>
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
      <FormInput
        label="Password"
        type="password"
        id="password"
        name="password"
      />
      <span className="flex flex-col gap-2 mt-3">
        <FormSubmit>Login</FormSubmit>
        <span className="text-center text-gray-600">
          don't have an account?
          <Link href="/signup" className="text-primary ml-1">
            sign up
          </Link>
        </span>
      </span>
    </BaseAuthForm>
  );
};

export default LoginForm;
