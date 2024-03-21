import { User } from "@prisma/client";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function normalizeEmail(email: string){
  return email;
}

export function cleanUser(user: User){
  return user;
}