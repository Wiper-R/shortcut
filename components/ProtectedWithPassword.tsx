"use client";
import { ShortenLink } from "@prisma/client";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchApi } from "@/lib/api-helpers";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

const PasswordValidator = z.object({ password: z.string(), isQR: z.boolean() });
type PasswordValidator = z.infer<typeof PasswordValidator>;

export function ProtectedWithPassword({ link, isQR }: { link: ShortenLink, isQR: boolean }) {
  const form = useForm<PasswordValidator>({
    resolver: zodResolver(PasswordValidator),
    defaultValues: {isQR}
  });
  const router = useRouter();
  const { toast } = useToast();
  async function onValid(data: PasswordValidator) {
    const res = await fetchApi(`/api/links/${link.slug}/validate-password`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.code == "success") {
      toast({
        description: "Password verification successful, redirecting...",
      });
      // TODO: Create engagement
      router.push(link.destination);
    } else {
      toast({ description: res.message });
    }
  }
  return (
    <form className="min-w-[500px]" onSubmit={form.handleSubmit(onValid)}>
      <div className="mb-5 text-center">Link is Protected with password</div>
      <Input type="password" {...form.register("password")} />
    </form>
  );
}
