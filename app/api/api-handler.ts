import { NextResponse } from "next/server";
import { APIHandler } from "./types";
import status from "http-status"
import { InvalidRequestBody } from "./api-errors";

type ApiHandlerProps = {
  [m in "GET" | "POST"]?: APIHandler<any>;
};

export function ApiHandler(handlers: ApiHandlerProps) {
  const methods: ApiHandlerProps = {};
  var k: keyof ApiHandlerProps;
  for (k in handlers) {
    const handler: APIHandler<any> = async (request, response) => {
      if (typeof handlers[k] === "function") {
          try{
            // @ts-ignore
            return await handlers[k](request, response);
        }
        catch (e){
            if (e instanceof InvalidRequestBody){
                return NextResponse.json({message: e.message, cause: e.cause}, {status: status.BAD_REQUEST})
            }
            throw e;
        }
      }

      throw new Error(`${k} is not a function`);
    };
    methods[k] = handler;
  }

  return methods;
}
