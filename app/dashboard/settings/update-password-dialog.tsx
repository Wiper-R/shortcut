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
import { useRouter } from "next/navigation";
import { changePasswordSchema } from "@/validators/authValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import client from "@/lib/api-client";
import { useToast } from "@/components/ui/use-toast";
import { getErrorMessage } from "@/lib/utils";

export function ChangePasswordDialog() {
  const form = useForm<changePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });
  const {toast} = useToast();
  const onValid = async (data: any) => {
    try{
      await client.patch("/auth/change-password", data);
      toast({title: "Success", description: "Password has been updated"})
    }
    catch (e){
      toast({title: "Error", description: getErrorMessage(e)})
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
