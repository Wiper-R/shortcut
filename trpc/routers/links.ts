import {
  CreateLinkSchema,
  EditLinkWithIdSchema,
} from "@/lib/validation/ManageLink";
import privateProcedure from "../procedures/privateProcedure";
import { router } from "../trpc";
import prisma from "@/prisma";
import { TRPCError } from "@trpc/server";
import { customAlphabet } from "nanoid";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import GetAllLinks from "@/lib/validation/GetAllLinks";
import moment from "moment";
import { Prisma } from "@prisma/client";

const linksRouter = router({
  create: privateProcedure.input(CreateLinkSchema).mutation(async (opts) => {
    const { input } = opts;
    const backHalf =
      input.backHalf ||
      customAlphabet(
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
      )(8);
    const expiresAt = input.expires ? moment(input.expires).toDate() : null;
    input.dest = new URL(input.dest).toString();
    try {
      const shortenLink = await prisma.link.create({
        data: {
          title: input.title,
          backHalf,
          dest: input.dest,
          userId: opts.ctx.session?.user.id!,
          expiresAt,
          password: input.password,
        },
      });

      if (input.hasQRCode) {
        await prisma.qrCode.create({
          data: { linkId: shortenLink.id, ...input.QRCode },
        });
      }

      return shortenLink;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code == "P2002") {
          throw new TRPCError({
            message: `Slug '${input.backHalf}' not available.`,
            code: "UNPROCESSABLE_CONTENT",
          });
        }
      }
      throw e;
    }
  }),
  getAll: privateProcedure.input(GetAllLinks).query(async (opts) => {
    const { input } = opts;
    const { limit, cursor, search } = input;

    const getSearchFilter = (): Prisma.LinkWhereInput => {
      if (search) {
        return {
          OR: [
            {
              title: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              backHalf: {
                contains: search,
                mode: "insensitive",
              },
            },

            {
              dest: {
                contains: search,
                mode: "insensitive",
              },
            },
          ],
        };
      }
      return {};
    };

    const data = await prisma.link.findMany({
      where: {
        userId: opts.ctx.session?.user.id!,
        ...getSearchFilter(),
      },
      orderBy: { createdAt: "desc" },
      include: { _count: { select: { Engagement: true } } },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });
    return {
      data: data.slice(0, limit),
      nextPage: data.length > limit ? data.at(-1)!.id : undefined,
    };
  }),

  edit: privateProcedure.input(EditLinkWithIdSchema).mutation(async (opts) => {
    const { input, ctx } = opts;
    const { id } = input;
    const link = await prisma.link.findFirst({
      where: { id, userId: opts.ctx.session?.user.id! },
    });
    const expiresAt =
      input.hasExpiry && input.expires ? moment(input.expires).toDate() : null;

    if (!link) throw new TRPCError({ code: "NOT_FOUND" });

    const isCustomBackHalf =
      link.isCustomBackHalf || link.backHalf !== input.backHalf;

    return await prisma.link.update({
      where: { id },
      data: {
        title: input.title,
        dest: input.dest,
        backHalf: input.backHalf,
        expiresAt: expiresAt,
        password: input.hasPassword ? input.password : null,
        isCustomBackHalf,
      },
    });
  }),
});

export default linksRouter;
