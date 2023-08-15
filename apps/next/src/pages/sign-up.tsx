import { useRouter } from 'next/router'
import { useState } from 'react'
import { api } from '~/utils/api'
import { signIn, signUp } from '~/utils/supabase'
import { MouseEvent } from 'react'

export default function SignUp() {
  const { push } = useRouter()
  const createUser = api.user.create.useMutation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleEmailSignInWithPress(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const { user, error } = await signUp(email, password)

    if (!user?.email) return

    createUser.mutate(
      {
        email: user.email,
        id: user.id,
      },
      {
        onSuccess: (res: any) => {
          console.log('res', res)
        },
      }
    )

    if (error) {
      console.error(error)

      return
    }
    push('/')
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-900 dark:text-zinc-50">
            Create a new account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white dark:bg-zinc-800 dark:border dark:border-zinc-700 px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-300"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 dark:bg-zinc-800 dark:ring-zinc-600 dark:text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-zinc-900 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    value={password}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-zinc-900 dark:bg-zinc-800 dark:ring-zinc-600 dark:text-zinc-50 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex mt-8 w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-400 dark:hover:bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-zinc-50 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={(e) => handleEmailSignInWithPress(e)}
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>

          <p className="mt-10 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <a
              href="sign-in"
              className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 dark:hover:text-indigo-500 hover:text-indigo-500"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
