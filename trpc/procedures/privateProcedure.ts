import authMiddleware from "../middlewares/auth";
import { publicProcedure } from "../trpc";

export default publicProcedure.use(authMiddleware);