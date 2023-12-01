import { TRPCError } from "@trpc/server";
import { middleware } from "../trpc";

const authMiddleware = middleware(async (opts) => {
  if (!opts.ctx.session?.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return opts.next();
});

export default authMiddleware;
