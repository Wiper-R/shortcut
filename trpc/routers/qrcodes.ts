import { CreateQRCode } from "@/lib/validation/ManageQRCode";
import privateProcedure from "../procedures/privateProcedure";
import { router } from "../trpc";
import prisma from "@/prisma";
import GetAllQrCodes from "@/lib/validation/GetAllQrCodes";
import { z } from "zod";
import { EditQRCodeSchema } from "@/lib/validation/EditQRCode";

const qrcodesRouter = router({
  create: privateProcedure.input(CreateQRCode).mutation(async (opts) => {
    // TODO: Handle errors
    await prisma.qrCode.create({ data: { ...opts.input } });
  }),

  edit: privateProcedure
    .input(EditQRCodeSchema.extend({ linkId: z.string().nonempty() }))
    .mutation(async (opts) => {
      const { linkId, ...input } = opts.input;
      await prisma.qrCode.update({
        where: { Link: { userId: opts.ctx.session?.user.id! }, linkId },
        data: input,
      });
    }),

  getAll: privateProcedure.input(GetAllQrCodes).query(async (opts) => {
    const { limit, cursor } = opts.input;
    const data = await prisma.qrCode.findMany({
      where: {
        Link: { userId: opts.ctx.session?.user.id! },
      },
      orderBy: { createdAt: "desc" },
      include: { Link: true },
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    return {
      data: data.slice(0, limit),
      nextPage: data.length > limit ? data.at(-1)!.id : undefined,
    };
  }),

  get: privateProcedure
    .input(z.object({ linkId: z.string().nonempty() }))
    .query(async (opts) => {
      return await prisma.qrCode.findFirst({
        where: {
          linkId: opts.input.linkId,
          Link: { userId: opts.ctx.session?.user.id },
        },
      });
    }),
});

export default qrcodesRouter;
