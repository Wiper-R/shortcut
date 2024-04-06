"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema } from "@/validators/authValidator";
import { cleanUser } from "@/lib/utils";
import { fetchApi } from "@/lib/api-helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import useSession from "@/auth/useSession";

type SignInApiResponse = {
    user: ReturnType<typeof cleanUser>;
}


export function SignInForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const useFormReturn = useForm<signInSchema>({ resolver: zodResolver(signInSchema) });
    const { toast } = useToast();
    const {dispatch} = useSession();

    async function OnValid(data: signInSchema) {
        let response = await fetchApi<SignInApiResponse>("/api/auth/sign-in", { method: "POST", body: JSON.stringify(data) })
        if (response.code == "success") {
            toast({
                title: "Login Successful",
                description: "You will be redirected to dashboard",
            })
            dispatch({type: "login_success", payload: response.data.user})
            let cbp = searchParams.get("cbp") || "/dashboard"
            router.push(cbp)
        }
    }

    function OnInvalid() {
        console.log(["Invalid"])
    }

    return <form onSubmit={useFormReturn.handleSubmit(OnValid, OnInvalid)}>
        <Card className="p-6">
            <Form {...useFormReturn}>
                <h3 className="text-xl font-medium">Login</h3>
                <div className="space-y-4 mt-6">
                    <FormField defaultValue="" name="email" render={({ field }) => <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl></FormItem>} />
                    <FormField defaultValue="" name="password" render={({ field }) => <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input {...field} type="password" />
                        </FormControl></FormItem>} />
                </div>
                <Button className="w-full mt-8">
                    Login
                </Button>
                <p className="text-sm">{"Don't have an account?"} <Link href="/signup" className={buttonVariants({ variant: "link", className: "px-1" })}>create one</Link></p>
            </Form>
        </Card>
    </form>
}