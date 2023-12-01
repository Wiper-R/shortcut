"use client";

import inputVariants from "./ui/input";
import buttonVariants from "./ui/button";
import SignInSchema, { SignInSchemaType } from "@/lib/validation/SignIn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ariaInvalid } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";
import { TRPCClientError } from "@trpc/client";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import useSession from "@/auth/useSession";
import { Loader2Icon } from "lucide-react";
import { revalidatePath } from "next/cache";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
  } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
  });

  const router = useRouter();

  const { data, mutateAsync } = trpc.auth.signIn.useMutation();
  const { dispatch } = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isValid) clearErrors();
  }, [isValid]);

  const onValid = async (data: SignInSchemaType) => {
    try {
      const user = await mutateAsync(data);
      toast.success("Login successful");
      dispatch({ type: "login_success", payload: user });
      const cbp = searchParams.get("cbp") || "/dashboard";
      router.push(cbp);
    } catch (e) {
      if (e instanceof TRPCClientError)
        setError("root", { message: e.message });
    }
  };

  return (
    <form
      className="flex flex-col gap-10 p-8"
      onSubmit={handleSubmit(onValid)}
      noValidate
    >
      <div>
        <label htmlFor="username" className="mb-1 block text-sm text-secondary">
          Username / Email
        </label>
        <input
          className={inputVariants({})}
          id="username"
          {...register("username")}
          {...ariaInvalid(errors, "root")}
        />
      </div>

      <div>
        <label htmlFor="username" className="mb-1 block text-sm text-secondary">
          Password
        </label>
        <input
          className={inputVariants({})}
          id="password"
          {...register("password")}
          {...ariaInvalid(errors, "root")}
          type="password"
        />
      </div>
      <div>
        <button
          className={buttonVariants({ size: "md", className: "w-full" })}
          disabled={isSubmitting || isSubmitSuccessful}
        >
          {(isSubmitting || isSubmitSuccessful) && (
            <Loader2Icon className="w-4 animate-spin" />
          )}
          Sign-in
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

export default SignIn;
