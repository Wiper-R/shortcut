"use client";

import inputVariants from "./ui/input";
import buttonVariants from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SignUpSchema, { SignUpSchemaType } from "@/lib/validation/SignUp";
import { ariaInvalid } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const { data, mutateAsync, error } = trpc.auth.signUp.useMutation({});
  const router = useRouter();

  useEffect(() => {
    const errors = error?.data?.zodError?.fieldErrors;
    if (!errors) return;
    for (var k in errors) {
      // @ts-ignore
      setError(k, { message: errors[k][0] });
    }
  }, [error]);

  const onValid = async (data: SignUpSchemaType) => {
    try {
      await mutateAsync(data);
      toast.success("Sign up successful");

      router.push("/sign-in");
    } catch (e) {}
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className="flex flex-col gap-10 p-8"
      noValidate
    >
      <div>
        <label htmlFor="username" className="block py-1 text-sm text-secondary">
          Username
        </label>
        <input
          className={inputVariants({})}
          id="username"
          {...register("username")}
          {...ariaInvalid(errors, "username")}
        />
        {errors.username?.message && (
          <span className="mt-1 block text-sm font-medium text-rose-600">
            {errors.username?.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block text-sm text-secondary">
          Email
        </label>
        <input
          className={inputVariants({})}
          id="email"
          {...register("email")}
          {...ariaInvalid(errors, "email")}
        />
        {errors.email?.message && (
          <span className="mt-1 block text-sm font-medium text-rose-600">
            {errors.email?.message}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="password" className="mb-2 block text-sm text-secondary">
          Password
        </label>
        <input
          className={inputVariants({})}
          id="password"
          type="password"
          {...register("password")}
          {...ariaInvalid(errors, "password")}
        />
        {errors.password?.message && (
          <span className="mt-1 block text-sm font-medium text-rose-600">
            {errors.password?.message}
          </span>
        )}
      </div>
      <div>
        <button
          className={buttonVariants({ size: "md", className: "w-full" })}
          disabled={isSubmitSuccessful || isSubmitting}
        >
          {(isSubmitting || isSubmitSuccessful) && (
            <Loader2Icon className="w-4 animate-spin" />
          )}
          Sign-up
        </button>
        {errors.root?.message && (
          <span className="mt-1 block text-sm font-medium text-rose-600">
            {errors.root?.message}
          </span>
        )}
      </div>
    </form>
  );
};

export default SignUp;
