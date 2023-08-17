import tranlations from '../data/translations.json'
import { router, protectedProcedure } from '../trpc'
import { LANGUAGES } from '../types/languages'
import { z } from 'zod'
import { histories, users } from '../db/schema'
import { eq } from 'drizzle-orm'

export const translationsRouter = router({
	getRandomSentence: protectedProcedure
		.input(z.object({ langQ: z.string(), langA: z.string() }))
		.query(({ input }) => {
			const sentenceObject = tranlations[Math.floor(tranlations.length * Math.random())]
			return {
				question: sentenceObject![input.langQ as LANGUAGES],
				solution: sentenceObject![input.langA as LANGUAGES],
			}
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
			const { db, user } = ctx
			const newHistory = {
				question: input.question,
				answer: input.answer,
				solution: input.solution,
				user_id: user!.id,
			}
			try {
				return await db.insert(histories).values(newHistory).run()
			} catch (e) {
				console.log('Insert Failed', e)
				return null
			}
		}),
	getHistories: protectedProcedure.query(async ({ ctx }) => {
		const { db, user } = ctx
		return await db.select().from(histories).where(eq(histories.user_id, user.id)).all()
	}),
})
