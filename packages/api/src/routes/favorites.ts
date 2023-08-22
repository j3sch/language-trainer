import { router, protectedProcedure, publicProcedure } from '../trpc';
import { z } from 'zod';
import { completedTasks } from '../db/schema';
import { eq, sql, and } from 'drizzle-orm';

export const favoritesRouter = router({
  favoriteTask: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { db } = ctx;
      const { id } = input;
      try {
        return await db
          .update(completedTasks)
          .set({ favorite: sql`CASE WHEN favorite = 1 THEN 0 ELSE 1 END` })
          .where(eq(completedTasks.id, id))
          .run();
      } catch (e) {
        console.log('Insert Failed', e);
        return null;
      }
    }),
  getFavorites: protectedProcedure
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
        .where(and(eq(completedTasks.user_id, user.id), eq(completedTasks.favorite, true)))
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
