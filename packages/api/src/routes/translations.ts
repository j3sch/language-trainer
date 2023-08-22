import tranlations from '../data/translations.json';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import { LANGUAGES } from '../types/languages';
import { z } from 'zod';
import { completedTasks } from '../db/schema';
import { eq, sql } from 'drizzle-orm';
import { checkAnswerAndMark } from '../utils/checkAnswerAndMark';
import { getMostSimilarSentence } from '../utils/getMostSimilarSentence';

export const translationsRouter = router({
  getRandomSentence: publicProcedure.input(z.object({ langQ: z.string(), langA: z.string() })).query(({ input }) => {
    const sentenceObject = tranlations[Math.floor(tranlations.length * Math.random())];
    return {
      question: sentenceObject![input.langQ as LANGUAGES][0],
      solution: sentenceObject![input.langA as LANGUAGES],
    };
  }),
  checkAnswer: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        solution: z.string().array(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, user } = ctx;

      try {
        const mostSimilarSentence = getMostSimilarSentence(input.answer, input.solution);
        const { markedAnswer, percentage } = checkAnswerAndMark(input.answer, mostSimilarSentence);

        const newHistory = {
          question: input.question,
          answer: markedAnswer,
          solution: mostSimilarSentence,
          user_id: user!.id,
          percentage,
        };

        return await db.insert(completedTasks).values(newHistory).returning().get();
      } catch (e) {
        console.log('Insert Failed', e);
        return null;
      }
    }),
  getHistories: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const { db, user } = ctx;
      const items = await db
        .select()
        .from(completedTasks)
        .orderBy(sql`${completedTasks.id} desc`)
        .where(eq(completedTasks.user_id, user.id))
        .limit(limit + 1)
        .offset(cursor)
        .all();
      let nextCursor: number | undefined = undefined;
      if (items.length > limit) {
        items.pop();
        nextCursor = cursor + limit;
      }
      return {
        items,
        nextCursor,
      };
    }),
});
