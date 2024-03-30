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
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { createLinkSchema } from "@/validators/linksValidator";
import { PencilIcon } from "lucide-react";

export function LinkEditDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const form = useForm<createLinkSchema>({
    resolver: zodResolver(createLinkSchema),
  });
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
          <form className="space-y-4" onSubmit={form.handleSubmit(() => {})}>
            <Form {...form}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <Input {...field} type="text" />
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
                      <FormLabel>Destination</FormLabel>
                      <Input type="text" {...field} />
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
                      <FormLabel>Back Half</FormLabel>
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
              <FormDescription>
                <Button variant="link" className="px-0">
                  Click here
                </Button>{" "}
                to generate a QR Code
              </FormDescription>
              <Button type="submit">
                <PencilIcon className="w-5" />
                <span className="ml-2">Edit</span>
              </Button>
            </Form>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
