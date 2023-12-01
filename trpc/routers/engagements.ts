import CreateEngagementSchema from "@/lib/validation/CreateEngagement";
import { publicProcedure, router } from "../trpc";
import prisma from "@/prisma";

const engagementsRouter = router({
  create: publicProcedure
    .input(CreateEngagementSchema)
    .mutation(async (opts) => {
      const { input } = opts;
      const ip = opts.ctx.ip;

      var countryCode: string | null = null;
      var ipReqURL: string;

      if (ip) ipReqURL = `https://ipapi.co/${opts.ctx.ip}/json`;
      else ipReqURL = `https://ipapi.co/json`;

      try {
        const res = await fetch(ipReqURL);
        const ipData = await res.json();
        countryCode = ipData.country_code || null;
      } catch (e) {}

      await prisma.engagement.create({
        data: {
          linkId: input.linkId,
          type: input.isScan ? "SCAN" : "CLICK",
          countryCode,
        },
      });
    }),
});

export default engagementsRouter;
