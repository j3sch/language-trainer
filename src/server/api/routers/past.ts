import { gerPastSentences } from "~/server/data/ger/past";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pastRouter = createTRPCRouter({
  getGerPast: publicProcedure.query(() => {
    return gerPastSentences[
      Math.floor(gerPastSentences.length * Math.random())
    ] as string;
  }),
});
