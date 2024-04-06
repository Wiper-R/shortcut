"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApi } from "@/lib/api-helpers";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeCanvas } from "qrcode.react";
import { createLinkSchema } from "@/validators/linksValidator";
import { DEFAULT_QR_BGCOLOR, DEFAULT_QR_FGCOLOR } from "@/constants";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type TitleApiData = {
  title: string | null;
  url: string;
};

export function CreateNewLinkForm() {
  const form = useForm<createLinkSchema>({
    resolver: zodResolver(createLinkSchema),

    defaultValues: useMemo(() => {
      return {
        title: "",
        destination: "",
        slug: "",
        generateQrCode: false,
        qrCode: { fgColor: DEFAULT_QR_FGCOLOR, bgColor: DEFAULT_QR_BGCOLOR },
      };
    }, []),
  });

  const [canFetchTitle, setCanFetchTitle] = useState(false);

  const queryKey = [`title/${form.watch("destination")}`];

  const queryClient = useQueryClient();
  const { data: titleData } = useQuery<TitleApiData>({
    queryKey,
    enabled: canFetchTitle,
    retry: 0,
    queryFn: fetchTitle,
  });

  async function fetchTitle(): Promise<TitleApiData> {
    const resp = await fetchApi<TitleApiData>("/api/private/title", {
      method: "POST",
      body: JSON.stringify({
        url: form.watch("destination"),
      }),
    });

    if (resp.code == "success") {
      return resp.data;
    }

    return { title: null, url: form.watch("destination") };
  }

  const onDestinationBlur = async () => {
    if (form.getFieldState("title").isTouched) {
      console.log("Returning Title Touched");
      return;
    }

    const destinationFieldState = form.getFieldState("destination");
    if (!destinationFieldState.isDirty || destinationFieldState.invalid) {
      return;
    }
    setCanFetchTitle(true);
    await queryClient.invalidateQueries({ queryKey });
  };

  const { toast } = useToast();

  async function onValid(formData: createLinkSchema) {
    try {
      const data: TitleApiData = await queryClient.ensureQueryData({
        queryKey,
      });
      formData.title = formData.title || data.title || "";
      formData.url = data.url;
      const response = await fetchApi("/api/links", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (response.code === "success") {
        toast({
          title: "Link has been shortened",
          description: "You will be redirected to link manage page.",
        });
      } else {
        // Handle error response
        console.error(
          "Error occurred while shortening link:",
          response.message,
        );
        toast({
          title: "Error",
          description:
            "An error occurred while shortening the link. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error occurred:", error);
      toast({
        title: "Error",
        description:
          "A network error occurred. Please check your internet connection and try again.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    const titleState = form.getFieldState("title");
    if (!titleState.isDirty) {
      const title = titleData?.title || "";
      form.setValue("title", title, { shouldDirty: false, shouldTouch: false });
    }
  }, [titleData, form.watch("title"), form]);

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onValid)}>
      <Form {...form}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="title">Title</Label>
              <Input {...field} id="title" type="text" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="destination"
          render={({ field }) => (
            <FormItem>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                type="text"
                {...field}
                onBlur={() => {
                  field.onBlur();
                  onDestinationBlur();
                }}
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
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
          )}
        />
        <Card className="p-4">
          <FormField
            control={form.control}
            name="generateQrCode"
            render={({ field: { value, ...field } }) => (
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
            )}
          />

          {form.watch("generateQrCode") && (
            <div className="my-4 flex items-center gap-x-4">
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
        <Button type="submit" disabled={!form.formState.isDirty}>
          Shorten Link
        </Button>
      </Form>
    </form>
  );
}
