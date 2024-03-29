import { AppProps } from 'next/app';
import { trpc } from 'src/utils/trpc';
import { createPagesBrowserClient, type Session } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import 'src/styles/globals.css';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'next-themes';
import { getSession } from 'src/utils/supabase/auth';

function MyApp({ Component, pageProps }: AppProps<{ initialSession: Session | null }>) {
  const [supabaseClient] = useState(() => createPagesBrowserClient());
  const { push, pathname } = useRouter();
  const unprotectedRoutes = pathname === '/sign-in' || pathname === '/sign-up' || pathname === '/verify-email';

  async function checkSession() {
    const { session } = await getSession();

    if (session && unprotectedRoutes) {
      push('/');
    } else if (!session && !unprotectedRoutes) {
      push('/sign-in');
    }
  }

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <>
      <Head>
        <title>Language trainer</title>
        <meta name="description" content="Improve your foreign language skills" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <SessionContextProvider supabaseClient={supabaseClient} initialSession={pageProps.initialSession}>
          <div className="flex h-screen w-screen">
            <Component {...pageProps} />
          </div>
        </SessionContextProvider>
      </ThemeProvider>
    </>
  );
}

export default trpc.withTRPC(MyApp);
