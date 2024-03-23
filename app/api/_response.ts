import { NextResponse } from "next/server";

export type ResponseType<T = unknown> =
  | {
      code: "success";
      data: T;
    }
  | { code: "error"; message: string };

export function successResponse<T>(
  data: T,
  init?: ResponseInit,
): NextResponse<ResponseType<T>> {
  return NextResponse.json(
    {
      code: "success",
      data,
    },
    init,
  );
}

export function errorResponse(
  {
    message,
  }: {
    message: string;
  },
  init?: ResponseInit,
): NextResponse<ResponseType> {
  return NextResponse.json(
    {
      code: "error",
      message,
    },
    init,
  );
}
