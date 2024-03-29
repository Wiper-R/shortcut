import { ResponseType } from "@/app/api/_response";
import config from "@/config";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

async function fetchApi<T = unknown>(
  uri: NodeJS.fetch.RequestInfo,
  options: RequestInit,
): Promise<ResponseType<T>> {
  let res = await fetch(uri, options);

  if (res.ok) {
    return await res.json();
  }

  try {
    return await res.json();
  } catch (e) {
    return { code: "error", message: "Unknown error occurred" };
  }
}



export {fetchApi};