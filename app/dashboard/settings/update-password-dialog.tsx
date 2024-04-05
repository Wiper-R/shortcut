"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { KeyRoundIcon } from "lucide-react";
import useSession from "@/auth/useSession";
import { fetchApi } from "@/lib/api-helpers";
import { useRouter } from "next/navigation";
import { updatePasswordSchema } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";

export function ChangePasswordDialog() {
  const form = useForm<updatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
  });
  const router = useRouter();
  const { dispatch } = useSession();
  const onValid = async (data: any) => {
    const response = await fetchApi("/api/auth/update-password", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    if (response.code == "success") {
      await fetchApi("/api/auth/logout", {});
      router.push("/");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" type="button">
          <KeyRoundIcon className="w-5" />{" "}
          <span className="ml-2">Change Password</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update password</DialogTitle>
          <DialogDescription>
            Changing password will cause logout from all your devices.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-3" onSubmit={form.handleSubmit(onValid)}>
            <FormField
              name="old"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Old Password</FormLabel>
                  <Input type="password" {...field} />
                </FormItem>
              )}
            />
            <FormField
              name="new"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" {...field} />
                </FormItem>
              )}
            />
            <Button>Save Changes</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
