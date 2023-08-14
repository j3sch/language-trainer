import { router } from './trpc'
import { authRouter } from './routes/auth'
import { userRouter } from './routes/user'
import { translationsRouter } from './routes/translations'

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  translations: translationsRouter,
})

export type AppRouter = typeof appRouter
