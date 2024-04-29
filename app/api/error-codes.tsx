import { HttpStatusCode } from "axios";
import { NextResponse } from "next/server";

function response(message: string, status: number) {
  return NextResponse.json({ message }, { status });
}

function Unauthorized(message?: string) {
  return response(
    message || "You are not authorized",
    HttpStatusCode.Unauthorized,
  );
}

function BadRequest(message?: string) {
  return response(message || "Invalid input", HttpStatusCode.BadRequest);
}

function Conflict(message: string) {
  return response(message, HttpStatusCode.Conflict);
}

function NotFound(message?: string) {
  return response(message || "Resource not found", HttpStatusCode.NotFound);
}

function Forbidden(message?: string){
  return response(message || "Forbidden", HttpStatusCode.Forbidden)
}

const errorCodes = { Unauthorized, BadRequest, Conflict, NotFound, Forbidden };

export default errorCodes;
