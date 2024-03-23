// TODO: Handle db errors

import { Prisma } from "@prisma/client";

export const isUniqueValidationError = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code == "P2002";

  export const requiredRecordsNotFound = (e: unknown) =>
  e instanceof Prisma.PrismaClientKnownRequestError && e.code == "P2025";