import { cleanUser } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// Define a type APIHandler that takes a generic type T
type JSONReturnType<T> = ReturnType<
  typeof NextResponse.json<T | { message: string; cause?: Map<string, string> }>
>;

// Define a type APIHandler that takes a generic type T
type APIHandler<T> = (
  request: NextRequest,
  response: NextResponse,
) => Promise<JSONReturnType<T>>;

type CleanUser = ReturnType<typeof cleanUser>;
