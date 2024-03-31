import { errorResponse } from "./_response";

function Unauthorized(message?: string) {
  return errorResponse(
    { message: message || "You are not authorized" },
    { status: 401 }
  );
}

function Unknown(message?: string) {
  return errorResponse(
    { message: message || "Something went wrong" },
    { status: 500 }
  );
}

function Forbidden(message?: string) {
  return errorResponse(
    { message: message || "You are not allowed to modify that resource" },
    { status: 403 }
  );
}

function Conflict(message?: string) {
  return errorResponse(
    { message: message || "Resource already exists" },
    { status: 409 }
  );
}

function NotFound(message?: string) {
  return errorResponse(
    { message: message || "Resource does not exist" },
    { status: 404 }
  );
}

function BadRequest(message?: string) {
  return errorResponse(
    { message: message || "Invalid request body" },
    { status: 400 }
  );
}

const errorCodes = {
  Unauthorized,
  Unknown,
  Forbidden,
  Conflict,
  NotFound,
  BadRequest,
  // TODO: Add more error
};

export default errorCodes;

// TODO: Add error format for zod validation errors i.e. bad request
