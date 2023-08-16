import {
	ArrowRightOnRectangleIcon,
	CalendarIcon,
	ChartPieIcon,
	DocumentDuplicateIcon,
	FolderIcon,
	UsersIcon,
} from '@heroicons/react/24/outline'
import { CounterClockwiseClockIcon, ExitIcon, HomeIcon, MoonIcon, StarIcon, SunIcon } from '@radix-ui/react-icons'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { getUser, signOut } from '~/utils/supabase'
import { useSupabaseUser } from '~/atoms/auth'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'

const navigation = [
	{ name: 'Learning', href: '/', icon: HomeIcon },
	{ name: 'History', href: '/history', icon: CounterClockwiseClockIcon },
	{ name: 'Favourites', href: '/favourites', icon: StarIcon },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function SidebarNavigation() {
	const [user] = useSupabaseUser()
	const { push, pathname } = useRouter()
	const { theme, setTheme } = useTheme()

	function onSignOut() {
		signOut()
		push('/sign-in')
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
							{navigation.map((item) => (
								<li key={item.name}>
									<a
										href={item.href}
										className={classNames(
											item.href === pathname
												? 'bg-zinc-800 text-white'
												: 'text-gray-400 hover:text-white hover:bg-zinc-700/40',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold items-center',
										)}
									>
										<item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</li>

					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							<li className="-mx-6 mt-auto">
								<a
									href="#"
									className="flex w-full items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-zinc-700/40"
								>
									<span className="sr-only">Your profile</span>
									<span aria-hidden="true">{user?.email}</span>
								</a>
							</li>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content className="border p-2 border-zinc-700 shadow w-52 flex flex-col rounded-md">
							<DropdownMenu.Item
								onClick={() => (theme == 'dark' ? setTheme('light') : setTheme('dark'))}
								className="py-1 px-3 h-10 flex flex-row items-center rounded-md text-zinc-500 hover:bg-white/5 dark:hover:bg-zinc-700/40  dark:bg-zinc-900 dark:text-zinc-300"
							>
								{theme == 'dark' ? (
									<div className="flex items-center space-x-3">
										<SunIcon />
										<span>Light Mode</span>
									</div>
								) : (
									<div className="flex items-center">
										<MoonIcon />
										<span>Dark Mode</span>
									</div>
								)}
							</DropdownMenu.Item>
							<DropdownMenu.Item
								className="py-1 px-3 h-10 flex space-x-3 flex-row items-center rounded-md text-zinc-500 hover:bg-white/5 dark:hover:bg-zinc-700/40   dark:bg-zinc-900 dark:text-zinc-300"
								onClick={onSignOut}
							>
								<ExitIcon />
								<span>Logout</span>
							</DropdownMenu.Item>

							{/* <div className="w-full">
								<button
									onClick={}
									className="items-center h-10 flex flex-row space-x-2 rounded-md  pl-3 p-2 text-zinc-500 hover:bg-white/5 dark:hover:bg-zinc-700/40  dark:bg-zinc-800/40 dark:text-zinc-400"
								>
									<span>Logout</span>
									<ArrowRightOnRectangleIcon className="h-10 py-2" />
								</button>
							</div> */}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</ul>
			</nav>
		</div>
	)
}
