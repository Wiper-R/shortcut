import { getSession } from "@/auth/session";
import { NextRequest } from "next/server";
import errorCodes from "../_error-codes";
import { updateUserSchema } from "@/validators/userValidator";
import prisma from "@/prisma";
import { cleanUser } from "@/lib/utils";
import { successResponse } from "../_response";

export async function PUT(request: NextRequest) {
    const session = await getSession();
    if (!session) {
      return errorCodes.Unauthorized();
    }
  
    const body = await request.json();
    const data = updateUserSchema.parse(body);
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data,
    });
  
    return successResponse({ user: cleanUser(user) });
  }