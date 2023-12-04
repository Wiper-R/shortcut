import { errorResponse } from "./_response";

export function unauthorized(message?: string) {
  return errorResponse(
    { message: message || "You are not authorized" },
    { status: 401 }
  );
}

export function somethingWentWrong(message?: string) {
  return errorResponse(
    { message: message || "Something went wrong" },
    { status: 500 }
  );
}
