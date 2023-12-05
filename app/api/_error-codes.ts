import { errorResponse } from "./_response";

function unauthorized(message?: string) {
  return errorResponse(
    { message: message || "You are not authorized" },
    { status: 401 }
  );
}

function unknown(message?: string) {
  return errorResponse(
    { message: message || "Something went wrong" },
    { status: 500 }
  );
}

function forbidden(message?: string) {
  return errorResponse({ message: message || "Forbidden" }, { status: 403 });
}

export default {
  unauthorized,
  unknown,
  forbidden,
  // TODO Add more error
};
