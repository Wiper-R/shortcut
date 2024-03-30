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
  } from "@/components/ui/form";
  import { useForm } from "react-hook-form";
  import { Card } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { QRCodeCanvas } from "qrcode.react";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { createLinkSchema } from "@/validators/linksValidator";
  import { PencilIcon } from "lucide-react";
  
  export function QREditDialog({
    open,
    setIsOpen,
  }: {
    open: boolean;
    setIsOpen: (v: boolean) => void;
  }) {
    const form = useForm<createLinkSchema>({
      resolver: zodResolver(createLinkSchema),
      defaultValues: {qrCode: {bgColor: "#ffffff", fgColor: "#000000"}}
    });
    return (
      <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editing QR-Code</DialogTitle>
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
              <div className="my-4 flex items-center gap-x-4">
                    {/* Inputs */}
                    <div className="space-y-4 flex-grow">
                        <FormField control={form.control} name="qrCode.bgColor" render={({ field }) =>
                            <FormItem>
                                <FormLabel>Background Color</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input type="color" {...field} className="p-0.5 w-12" />
                                    </FormControl>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value.toUpperCase()} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        } />
                        <FormField control={form.control} name="qrCode.fgColor" render={({ field }) =>
                            <FormItem>
                                <FormLabel>Foreground Color</FormLabel>
                                <div className="flex items-center gap-2">
                                    <FormControl>
                                        <Input type="color" {...field} className="p-0.5 w-12" />
                                    </FormControl>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value.toUpperCase()} />
                                    </FormControl>
                                </div>
                            </FormItem>
                        } />
                    </div>
                    <Card>
                        <QRCodeCanvas value="Shortcut" fgColor={form.watch("qrCode.fgColor")}
                            bgColor={form.watch("qrCode.bgColor")} size={160} includeMargin />
                    </Card>
                </div>
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
  