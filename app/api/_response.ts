import { NextResponse } from "next/server";

type ResponseType =
  | {
      code: "success";
      data: unknown;
    }
  | { code: "error"; message: string };

export function successResponse(
  data: unknown,
  init?: ResponseInit
): NextResponse<ResponseType> {
  return NextResponse.json(
    {
      code: "success",
      data,
    },
    init
  );
}

export function errorResponse(
  {
    message,
  }: {
    message: string;
  },
  init?: ResponseInit
): NextResponse<ResponseType> {
  return NextResponse.json(
    {
      code: "error",
      message,
    },
    init
  );
}
