import { createTRPCRouter } from "~/server/api/trpc";
import { pastRouter } from "./routers/past";
import { checkAnswerRouter } from "./routers/checkAnswer";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  past: pastRouter,
  checkAnswer: checkAnswerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
