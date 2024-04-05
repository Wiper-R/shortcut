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
import { zodResolver } from "@hookform/resolvers/zod";
import { updateQrCodeSchema } from "@/validators/qrCodeValidator";
import { PenIcon } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { DEFAULT_QR_BGCOLOR, DEFAULT_QR_FGCOLOR } from "@/constants";
import { useDataProvider } from "@/contexts/data-provider";
import { QRCodeWithShortenLink } from "./qrcode-container";
import { fetchApi } from "@/lib/api-helpers";
import { toast } from "@/components/ui/use-toast";

export function QREditDialog({
  open,
  setIsOpen,
}: {
  open: boolean;
  setIsOpen: (v: boolean) => void;
}) {
  const { data, setData } = useDataProvider<QRCodeWithShortenLink>();
  const form = useForm<updateQrCodeSchema>({
    resolver: zodResolver(updateQrCodeSchema),
    defaultValues: { fgColor: data.fgColor, bgColor: data.bgColor },
  });

  async function onValid(updateData: updateQrCodeSchema) {
    const res = await fetchApi(`/api/qr-codes/${data.id}`, {
      method: "PATCH",
      body: JSON.stringify(updateData),
    });

    if (res.code == "success") {
      toast({ description: "QR Code has been edited" });
      setData({ ...data, ...(res.data as any).qrCode });
      setIsOpen(false);
    }
  }

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
          <form className="space-y-4" onSubmit={form.handleSubmit(onValid)}>
            <Form {...form}>
              <div className="my-4 flex items-center gap-x-4">
                {/* Inputs */}
                <div className="flex-grow space-y-4">
                  <FormField
                    control={form.control}
                    name="fgColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foreground Color</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="color"
                              {...field}
                              className="w-12 p-0.5"
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              value={field.value?.toUpperCase()}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bgColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Color</FormLabel>
                        <div className="flex items-center gap-2">
                          <FormControl>
                            <Input
                              type="color"
                              {...field}
                              className="w-12 p-0.5"
                            />
                          </FormControl>
                          <FormControl>
                            <Input
                              type="text"
                              {...field}
                              value={field.value?.toUpperCase()}
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <Card className="p-6">
                  <QRCodeCanvas
                    value="Shortcut Test QR"
                    fgColor={form.watch("fgColor")}
                    bgColor={form.watch("bgColor")}
                    size={112}
                  />
                </Card>
                {/* <QRCodeSvgCard /> */}
              </div>
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
