"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { createLinkSchema } from "@/validators/linksValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApi } from "@/lib/api-helpers";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeCanvas } from "qrcode.react";
import { DEFAULT_QR_BGCOLOR, DEFAULT_QR_FGCOLOR } from "@/constants";

export function CreateNewLink() {
  // TODO: Auto fetch title
  const form = useForm<createLinkSchema>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      qrCode: { fgColor: DEFAULT_QR_FGCOLOR, bgColor: DEFAULT_QR_BGCOLOR },
    },
  });
  const { toast } = useToast();

  async function onValid(data: createLinkSchema) {
    const r = await fetchApi("/api/links", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (r.code == "success") {
      toast({
        title: "Link has been shortened",
        description: "You will be redirected to link manage page.",
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onValid)}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => {
            return (
              <FormItem>
                <Label htmlFor="title">Title</Label>
                <Input {...field} id="title" type="text" />
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
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" type="text" {...field} />
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
        <Card className="p-4">
          <FormField
            control={form.control}
            name="generateQrCode"
            render={({ field: { value, ...field } }) => {
              return (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel>Generate QR</FormLabel>
                    <FormControl>
                      <Switch
                        {...field}
                        checked={value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Create a QR code along with link with customized colors and
                    icon
                  </FormDescription>
                </FormItem>
              );
            }}
          />

          {form.watch("generateQrCode") && (
            <div className="my-4 flex items-center gap-x-4">
              {/* Inputs */}
              <div className="flex-grow space-y-4">
                <FormField
                  control={form.control}
                  name="qrCode.bgColor"
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
                            value={field.value.toUpperCase()}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="qrCode.fgColor"
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
                            value={field.value.toUpperCase()}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <Card className="p-6">
                <QRCodeCanvas
                  value="Shortcut"
                  fgColor={form.watch("qrCode.fgColor")}
                  bgColor={form.watch("qrCode.bgColor")}
                  size={112}
                />
              </Card>
            </div>
          )}
        </Card>
        <Button type="submit">Shorten Link</Button>
      </Form>
    </form>
  );
}
