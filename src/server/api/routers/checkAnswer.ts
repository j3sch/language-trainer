import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { gptCheckAnswer } from "~/server/utils/openApi";

export const checkAnswerRouter = createTRPCRouter({
  checkAnswer: publicProcedure
    .input(z.object({ question: z.string(), answer: z.string() }))
    .mutation(({ input }) => {
      return gptCheckAnswer(input);
    }),
});
