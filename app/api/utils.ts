import { NextRequest } from "next/server";
import { ZodError, z } from "zod";
import { InvalidRequestBody } from "./api-errors";

export async function parseJson<T>(request: NextRequest, schema: z.Schema<T>) {
  try {
    var body = await request.json();
  } catch (e) {
    if (e instanceof SyntaxError) throw new InvalidRequestBody();
    throw e;
  }

  try {
    return await schema.parseAsync(body);
  } catch (e) {
    if (e instanceof ZodError) {
      throw new InvalidRequestBody(
        e.issues.map((i) => [i.path.join("."), i.message]),
      );
    }

    throw e;
  }
}
