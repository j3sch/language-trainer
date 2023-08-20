import tranlations from '../data/translations.json';
import { router, protectedProcedure, publicProcedure } from '../trpc';
import { LANGUAGES } from '../types/languages';
import { z } from 'zod';
import { histories, users } from '../db/schema';
import { eq, sql } from 'drizzle-orm';

export const translationsRouter = router({
  getRandomSentence: publicProcedure.input(z.object({ langQ: z.string(), langA: z.string() })).query(({ input }) => {
    const sentenceObject = tranlations[Math.floor(tranlations.length * Math.random())];
    return {
      question: sentenceObject![input.langQ as LANGUAGES],
      solution: sentenceObject![input.langA as LANGUAGES],
    };
  }),
  saveAnswer: protectedProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        solution: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db, user } = ctx;
      const newHistory = {
        question: input.question,
        answer: input.answer,
        solution: input.solution,
        user_id: user!.id,
      };
      try {
        return await db.insert(histories).values(newHistory).run();
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
        .from(histories)
        .orderBy(sql`${histories.id} desc`)
        .where(eq(histories.user_id, user.id))
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
