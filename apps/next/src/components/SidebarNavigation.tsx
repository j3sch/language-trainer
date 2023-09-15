import { CounterClockwiseClockIcon, ExitIcon, HomeIcon, StarIcon } from '@radix-ui/react-icons';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { signOut } from 'src/utils/supabase';
import { useSupabaseUser } from 'src/atoms/auth';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { useNavigation } from 'src/atoms/navigation';
import { useUser } from 'src/utils/supabase/auth';
import { TNavigation } from 'src/types/navigation';

const pages: {
  name: string;
  href: TNavigation;
  icon: React.ElementType;
}[] = [
  { name: 'Learning', href: 'learning', icon: HomeIcon },
  { name: 'History', href: 'history', icon: CounterClockwiseClockIcon },
  { name: 'Favorites', href: 'favorites', icon: StarIcon },
];

export default function SidebarNavigation() {
  useUser();
  const [user] = useSupabaseUser();
  const { push } = useRouter();
  const [navigation, setNavigation] = useNavigation();

  function onSignOut() {
    signOut();
    push('/sign-in');
  }

  return (
    <div className="flex h-full w-64 flex-col gap-y-6 overflow-y-auto px-6">
      <div className="flex h-16 shrink-0 items-end">
        <h1 className="text-zinc-50 text-2xl font-bold">Language Trainer</h1>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7 justify-between">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {pages.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => setNavigation(item.href)}
                    className={clsx(
                      item.href === navigation
                        ? 'bg-zinc-800 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-zinc-700/40',
                      'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center w-full',
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </li>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="focus:outline-none">
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className=" flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-700/40"
                >
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">{user?.email}</span>
                </a>
              </li>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="border p-2 border-zinc-700 shadow w-52 flex flex-col rounded-md">
              <DropdownMenu.Item
                className="py-1 px-3 h-10 focus:outline-none flex space-x-3 flex-row items-center rounded-md text-zinc-500 hover:bg-white/5 dark:hover:bg-zinc-700/40   dark:bg-zinc-900 dark:text-zinc-300"
                onClick={onSignOut}
              >
                <ExitIcon />
                <span>Logout</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </ul>
      </nav>
    </div>
  );
}
