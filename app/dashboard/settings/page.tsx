"use client";

import useSession from "@/auth/useSession";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { KeyRound, LogOutIcon, PenIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { fetchApi } from "@/lib/api-helpers";
import { updateUserSchema } from "@/validators/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { cleanUser } from "@/lib/utils";
import { successResponse } from "@/app/api/_response";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { session, dispatch } = useSession();
  const form = useForm<updateUserSchema>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    form.setValue("name", session.data?.user.name, { shouldDirty: false });
    form.setValue("email", session.data?.user.email, { shouldDirty: false });
  }, [session.data]);

  const onValid = async (data: updateUserSchema) => {
    const resp = await fetchApi("/api/users", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (resp.code == "success") {
      dispatch({ payload: (resp.data as any).user, type: "login_success" });
      toast({ title: "Success", description: "User has been updated" });
    } else {
      toast({
        title: "Failed",
        description: "Failed to update. Please retry after sometime",
        variant: "destructive",
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
          <div className="mt-5">
            {/* TODO: Add functionality to change password */}
            <Button variant="outline" type="button">
              <KeyRound className="w-5" />{" "}
              <span className="ml-2">Change Password</span>
            </Button>
            <FormDescription className="mt-1">
              {/* TODO: Changing password should logout from all devices */}
              Changing password will logout you from all devices.
            </FormDescription>
          </div>
          <div className="mt-5 flex space-x-2">
            <Button type="submit" disabled={!form.formState.isDirty}>
              <PenIcon className="w-5" />{" "}
              <span className="ml-2">Update settings</span>
            </Button>
          </div>
        </form>
      </Form>
      <Separator orientation="horizontal" className="my-8" />
      <Button
        variant="outline"
        className="border-destructive text-destructive hover:border-destructive hover:text-destructive"
        onClick={async () => {
          await fetch("/api/auth/logout");
          router.push("/");
        }}
      >
        <LogOutIcon className="w-5" /> <span className="ml-2">Logout</span>
      </Button>
    </div>
  );
}
