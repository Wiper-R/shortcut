import authRouter from "./routers/auth";
import engagementsRouter from "./routers/engagements";
import linksRouter from "./routers/links";
import privateRouter from "./routers/private";
import qrcodesRouter from "./routers/qrcodes";
import { router } from "./trpc";
const appRouter = router({
  auth: authRouter,
  links: linksRouter,
  qrcodes: qrcodesRouter,
  engagements: engagementsRouter,
  private: privateRouter,
});
// Export type router type signature,
// NOT the router itself.
export { appRouter };
export type AppRouter = typeof appRouter;
