import { type KeyboardEvent, type MouseEvent } from 'react'

interface Props {
	onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
	answer: string
	onClick: (event: MouseEvent<HTMLButtonElement>) => void
	setAnswer: (answer: string) => void
}

export default function TranslateInput(props: Props) {
	const { onKeyDown, onClick, setAnswer } = props

	return (
		<div className="flex w-full rounded-md shadow-sm">
			<div className="relative flex w-full flex-grow items-stretch focus-within:z-10">
				<input
					type="text"
					name="answer"
					id="answer"
					className="text-md block w-full rounded-none rounded-l-md border-0 py-3 pl-6 text-black ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6"
					placeholder="Your Answer"
					autoComplete="off"
					onKeyDown={onKeyDown}
					onChange={(e) => {
						setAnswer(e.target.value)
					}}
					value={props.answer}
				/>
			</div>
			<button
				onClick={onClick}
				type="button"
				className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-lg font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-700/40"
			>
				Sumbit
			</button>
		</div>
	)
}
