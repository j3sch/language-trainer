import tranlations from '~/data/translations.json'
import { router, publicProcedure } from '~/trpc'
import { LANGUAGES } from '~/types/languages'
import { z } from 'zod'
import { histories } from '~/db/schema'

export const translationsRouter = router({
  getRandomSentence: publicProcedure
    .input(z.object({ langQ: z.string(), langA: z.string() }))
    .query(({ input }) => {
      const sentenceObject = tranlations[Math.floor(tranlations.length * Math.random())]
      return {
        question: sentenceObject![input.langQ as LANGUAGES],
        solution: sentenceObject![input.langA as LANGUAGES],
      }
    }),
  saveAnswer: publicProcedure
    .input(
      z.object({
        question: z.string(),
        answer: z.string(),
        solution: z.string(),
      })
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
})
