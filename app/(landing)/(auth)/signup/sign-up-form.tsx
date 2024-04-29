"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/validators/authValidator";
import { cleanUser, getErrorMessage } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import client from "@/lib/api-client";

export function SignUpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const useFormReturn = useForm<signUpSchema>({
    resolver: zodResolver(signUpSchema),
  });
  const { toast } = useToast();

  async function OnValid(data: signUpSchema) {
    try {
      await client.post<ReturnType<typeof cleanUser>>(
        "/auth/signup",
        data,
      );
      let cbp = searchParams.get("cbp") || "/dashboard/overview";
      router.push(cbp);
      toast({
        title: "Sign-up Successful",
        description: "You will be redirected to dashboard",
      });
    } catch (e) {
      toast({
        title: "Sign-up failed!",
        description: getErrorMessage(e),
      });
    }
  }

  function OnInvalid() {
    console.log(["Invalid"]);
  }

  return (
    <form onSubmit={useFormReturn.handleSubmit(OnValid, OnInvalid)}>
      <Card className="p-6">
        <Form {...useFormReturn}>
          <h3 className="text-xl font-medium">Sign-Up</h3>
          <div className="mt-6 space-y-4">
            <FormField
              defaultValue=""
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              defaultValue=""
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              defaultValue=""
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-8 w-full">Create Account</Button>
          <p className="text-sm">
            already have an account?{" "}
            <Link
              href="/login"
              className={buttonVariants({ variant: "link", className: "px-1" })}
            >
              login
            </Link>
          </p>
        </Form>
      </Card>
    </form>
  );
}
