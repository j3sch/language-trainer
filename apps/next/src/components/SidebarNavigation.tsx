import { CalendarIcon, ChartPieIcon, DocumentDuplicateIcon, FolderIcon, UsersIcon } from '@heroicons/react/24/outline'
import { CounterClockwiseClockIcon, HomeIcon, StarIcon } from '@radix-ui/react-icons'
import { useCurrentNav } from '~/atoms/navigation'

const navigation = [
	{ name: 'History', href: '#', icon: HomeIcon, count: '5', current: true },
	{ name: 'Favourites', href: '#', icon: UsersIcon, current: false },
]

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

export default function SidebarNavigation() {
	const [currentNav, setCurrentNav] = useCurrentNav()

	const navigation = [
		{ name: 'Learning', href: '#', icon: HomeIcon, current: currentNav === 'Learning' },
		{ name: 'History', href: '#', icon: CounterClockwiseClockIcon, current: currentNav === 'History' },
		{ name: 'Favourites', href: '#', icon: StarIcon, current: currentNav === 'Favourites' },
	]

	return (
		<div className="flex h-full grow flex-col gap-y-6 overflow-y-auto px-6">
			<div className="flex h-16 shrink-0 items-end">
				<h1 className="text-zinc-50 text-2xl font-bold">Language Trainer</h1>C H H
			</div>
			<nav className="flex flex-1 flex-col">
				<ul role="list" className="flex flex-1 flex-col gap-y-7">
					<li>
						<ul role="list" className="-mx-2 space-y-1">
							{navigation.map((item) => (
								<li key={item.name} onClick={() => setCurrentNav(item.name)}>
									<a
										href={item.href}
										className={classNames(
											item.current
												? 'bg-gray-800 text-white'
												: 'text-gray-400 hover:text-white hover:bg-gray-800',
											'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold',
										)}
									>
										<item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
										{item.name}
									</a>
								</li>
							))}
						</ul>
					</li>

					<li className="-mx-6 mt-auto">
						<a
							href="#"
							className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
						>
							<img
								className="h-8 w-8 rounded-full bg-gray-800"
								src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
								alt=""
							/>
							<span className="sr-only">Your profile</span>
							<span aria-hidden="true">Tom Cook</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	)
}
