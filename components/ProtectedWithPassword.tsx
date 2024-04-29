"use client";
import { ShortenLink } from "@prisma/client";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import client from "@/lib/api-client";
import { getErrorMessage } from "@/lib/utils";

const PasswordValidator = z.object({ password: z.string() });
type PasswordValidator = z.infer<typeof PasswordValidator>;

export function ProtectedWithPassword({
  link,
}: {
  link: ShortenLink;
}) {
  const form = useForm<PasswordValidator>({
    resolver: zodResolver(PasswordValidator)
  });
  const router = useRouter();
  const { toast } = useToast();
  async function onValid(data: PasswordValidator) {
    try {
      await client.post(`/links/${link.slug}/validate-password`, data);
      toast({
        title: "Success",
        description: "Password verification successful, redirecting...",
      });
      router.push(link.destination);
    } catch (e) {
      toast({ title: "Error", description: getErrorMessage(e) });
    }
  }
  return (
    <form className="min-w-[500px]" onSubmit={form.handleSubmit(onValid)}>
      <div className="mb-5 text-center">Link is Protected with password</div>
      <Input type="password" {...form.register("password")} />
    </form>
  );
}
