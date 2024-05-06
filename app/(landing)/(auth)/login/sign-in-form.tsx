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
import { signInSchema } from "@/validators/authValidator";
import { cleanUser, getErrorMessage } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/auth/client";
import client from "@/lib/api-client";

export function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm<signInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const { toast } = useToast();
  const { dispatch } = useSession();

  async function OnValid(data: signInSchema) {
    try {
      const res = await client.post<ReturnType<typeof cleanUser>>(
        "/auth/login",
        data,
      );
      dispatch({ type: "login_success", payload: res.data });
      toast({
        title: "Login Successful",
        description: "You will be redirected to dashboard",
      });
      let cbp = searchParams.get("cbp") || "/dashboard/overview";
      router.push(cbp);
    } catch (e) {
      toast({
        title: "Login failed",
        description: getErrorMessage(e),
      });
    }
  }

  function OnInvalid() {
    console.log(["Invalid"]);
  }

  return (
    <form onSubmit={form.handleSubmit(OnValid, OnInvalid)}>
      <Card className="p-6">
        <Form {...form}>
          <h3 className="text-xl font-medium">Login</h3>
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
          <Button
            className="mt-8 w-full"
            disabled={form.formState.isSubmitting}
          >
            Login
          </Button>
          <p className="text-sm">
            {"Don't have an account?"}{" "}
            <Link
              href="/signup"
              className={buttonVariants({ variant: "link", className: "px-1" })}
            >
              create one
            </Link>
          </p>
        </Form>
      </Card>
    </form>
  );
}
