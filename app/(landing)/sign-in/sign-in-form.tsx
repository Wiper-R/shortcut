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



export function SignInForm() {
    const useFormReturn = useForm<signInSchema>({ resolver: zodResolver(signInSchema) });

    async function OnValid(data: signInSchema) {
        let req = await fetch("/api/auth/sign-in", {
            method: "POST",
            body: JSON.stringify(data)
        })

        let d = await req.json()
        console.log(d)
    }

    function OnInvalid() {
        console.log(["Invalid"])
    }

    return <form onSubmit={useFormReturn.handleSubmit(OnValid, OnInvalid)}>
        <Card className="p-6">
            <Form {...useFormReturn}>
                <h3 className="text-xl font-medium">Sign-In</h3>
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
                <p className="text-sm">Don't have an account? <Link href="/signup" className={buttonVariants({ variant: "link", className: "px-1" })}>create one</Link></p>
            </Form>
        </Card>
    </form>
}