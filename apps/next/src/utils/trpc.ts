import { createTRPCNext } from '@trpc/next';
import { httpBatchLink, loggerLink } from '@trpc/client';
import type { AppRouter } from 'api/src/router';
import { supabase } from './supabase';

const getBaseUrl = () => {
  return `${process.env.NEXT_PUBLIC_API_URL}`;
};

export const trpc = createTRPCNext<AppRouter>({
  config() {
    return {
      links: [
        loggerLink({
          enabled: (opts) =>
            process.env.NODE_ENV === 'development' || (opts.direction === 'down' && opts.result instanceof Error),
        }),
        httpBatchLink({
          async headers() {
            const { data } = await supabase.auth.getSession();
            const token = data?.session?.access_token;

            return {
              Authorization: token ? `Bearer ${token}` : undefined,
            };
          },
          url: `${getBaseUrl()}/trpc`,
        }),
      ],
      queryClientConfig: {
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      },
    };
  },
  ssr: false,
});
