import { publicProcedure, router } from "../trpc";
import { z } from "zod";
import { getTitleFromURL } from "@/lib/utils";

const privateRouter = router({
  title: publicProcedure
    .input(
      z.object({
        url: z.string().url().nonempty(),
      }),
    )
    .query(async (opts) => await getTitleFromURL(opts.input.url)),
});

export default privateRouter;
