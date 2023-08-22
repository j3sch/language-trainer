import { router } from './trpc';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import { translationsRouter } from './routes/translations';
import { favoritesRouter } from './routes/favorites';

export const appRouter = router({
  user: userRouter,
  auth: authRouter,
  translations: translationsRouter,
  favorites: favoritesRouter,
});

export type AppRouter = typeof appRouter;
