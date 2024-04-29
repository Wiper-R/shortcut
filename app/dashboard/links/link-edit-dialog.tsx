import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormLabel,
  FormItem,
  FormControl,
  FormField,
  FormDescription,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateLinkSchema } from "@/validators/linksValidator";
import { PenIcon } from "lucide-react";
import { toast, useToast } from "@/components/ui/use-toast";
import { useDataProvider } from "@/contexts/data-provider";
import { ShortenLink } from "@prisma/client";
import client from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

export function LinkEditDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const { toast } = useToast();
  const { data, setData } = useDataProvider<ShortenLink>();
  const form = useForm<updateLinkSchema>({
    resolver: zodResolver(updateLinkSchema),
    defaultValues: data,
  });

  async function onValid(updateData: updateLinkSchema) {
    // TODO: Add link-context and qr-code context
    try {
      const res = await client.patch(`/links/${data.slug}`, updateData);
      toast({ title: "Success", description: "Link has been edited" });
      setData({ ...data, ...res.data });
      setIsOpen(false);
    } catch (e) {
      toast({ title: "Error", description: getErrorMessage(e) });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editing Link</DialogTitle>
          <DialogDescription>
            You are currently editing{" "}
            <Link
              href="http://shortuct.com/l/xyz"
              className="font-semibold text-black"
            >
              http://shortuct.com/l/xyz
            </Link>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onValid)}>
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          value={field.value || ""}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Destination*</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Back Half*</FormLabel>
                      <div className="flex gap-6">
                        <FormControl>
                          <Input type="text" {...field} />
                        </FormControl>
                        {/* TODO: Implement check availability */}
                        <Button type="button" variant="secondary">
                          Check Availability
                        </Button>
                      </div>
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input
                      {...field}
                      type="password"
                      value={field.value || undefined}
                    />
                    <FormDescription>
                      Optional: Enter a password to protect your links
                    </FormDescription>
                  </FormItem>
                )}
              />
              {/* TODO: Implement qr code generation */}
              <FormDescription>
                <Button variant="link" className="px-0">
                  Click here
                </Button>{" "}
                to generate a QR Code
              </FormDescription>
              <Button type="submit" disabled={!form.formState.isDirty}>
                <PenIcon className="w-5" />
                <span className="ml-2">Edit</span>
              </Button>
            </Form>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
