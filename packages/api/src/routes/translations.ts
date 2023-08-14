import tranlations from '~/data/translations.json'
import { router, publicProcedure } from '~/trpc'
import { LANGUAGES } from '~/types/languages'
import { z } from 'zod'

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
    .mutation(({ input }) => {}),
})
