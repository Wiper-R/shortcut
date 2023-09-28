"use client";

import { SignUp_POST } from "@/validators";
import BaseAuthForm from "./BaseAuthForm"
import {FormEvent} from "react";
import FormInput from "./Shared/FormInput";
import FormSubmit from "./Shared/FormSubmit";
import Link from "next/link";


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



const SignupForm = () => {
    return  <BaseAuthForm
    onSubmit={onSubmit}
  >
    <span className="mb-5">
      <h4 className="text-center text-3xl font-semibold text-gray-700">
        Create an account
      </h4>
      <hr className="h-0.5 bg-gray-300 mt-1.5" />
    </span>
    <FormInput label="Email" type="email" id="email" name="email" />
    <FormInput label="Username" type="text" id="username" name="username" />
    <span>
      <FormInput
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
      <FormSubmit>Create account</FormSubmit>
      <span className="text-center text-gray-600">
        already have an account?
        <Link href="/login" className="text-primary ml-1">
          login
        </Link>
      </span>
    </span>
  </BaseAuthForm>
}

export default SignupForm;