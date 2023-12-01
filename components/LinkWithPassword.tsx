"use client";

import React from "react";
import inputVariants from "./ui/input";
import buttonVariants from "./ui/button";
import Link from "next/link";
import { PrismaLink } from "@/types";
import { useForm } from "react-hook-form";
import LWP, {
  LWPSchemaType,
} from "@/lib/validation/LinkWithPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ariaInvalid } from "@/lib/utils";
import { trpc } from "@/app/_trpc/client";

function LinkWithPassword({
  link,
  isScan,
}: {
  link: PrismaLink;
  isScan: boolean;
}) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LWPSchemaType>({
    resolver: zodResolver(LWP),
  });

  const router = useRouter();
  const { mutateAsync } = trpc.engagements.create.useMutation();

  const onValid = async (data: LWPSchemaType) => {
    if (data.password == link.password) {
      await mutateAsync({ linkId: link.id, isScan: isScan });
      router.push(link.dest);
    } else {
      setError("password", { message: "Incorrect password", type: "value" });
    }
  };
  return (
    <div className="w-full">
      <div className="mx-auto px-4 flex max-w-3xl flex-col gap-5 text-center">
        <h2 className="text-2xl font-semibold">Protected with password</h2>
        <form className="" onSubmit={handleSubmit(onValid)}>
          <div className="flex gap-4 flex-col md:flex-row">
            <input
              type="password"
              className={inputVariants({  })}
              {...register("password")}
              {...ariaInvalid(errors, "password")}
            />
            <button className={buttonVariants({})}>Submit</button>
          </div>
          {errors.password?.message && (
            <span className="mt-1 block text-start text-sm font-medium text-rose-600">
              {errors.password?.message}
            </span>
          )}
        </form>
        <p>The link you are trying to access is protected with password.</p>
        <p className="font-medium">
          Return to{" "}
          <Link href={"/"} className="text-ascent underline underline-offset-2">
            home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LinkWithPassword;
