"use client";

import useSession from "@/auth/useSession";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { LogOutIcon, PenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { updateUserSchema } from "@/validators/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { useEffect, useMemo } from "react";
import { ChangePasswordDialog } from "./update-password-dialog";
import client from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export default function Page() {
  const router = useRouter();
  const { session, dispatch } = useSession();
  const user = session.data?.user;
  const form = useForm<updateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: useMemo(() => {
      return { name: user?.name || "", email: user?.email || "" };
    }, [user]),
  });

  useEffect(() => {
    form.reset({ email: user?.email || "", name: user?.name || "" });
  }, [user]);

  const onValid = async (data: updateUserSchema) => {
    try {
      const res = await client.patch("/auth/user", data);
      dispatch({ payload: res.data, type: "login_success" });
      toast({ title: "Success", description: "User has been updated" });
    } catch (e) {
      toast({
        title: "Failed",
        description: getErrorMessage(e),
      });
    }
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValid)}>
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="mt-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="mt-5 flex space-x-2">
            <Button type="submit" disabled={!form.formState.isDirty}>
              <PenIcon className="w-5" />{" "}
              <span className="ml-2">Update settings</span>
            </Button>
          </div>
        </form>
      </Form>
      <Separator orientation="horizontal" className="my-8" />
      <div className="space-x-2">
        <ChangePasswordDialog />
        <Button
          variant="destructive"
          onClick={async () => {
            await client.get("/auth/logout");
            dispatch({ type: "logout" });
            router.push("/");
          }}
        >
          <LogOutIcon className="w-5" /> <span className="ml-2">Logout</span>
        </Button>
      </div>
    </div>
  );
}
