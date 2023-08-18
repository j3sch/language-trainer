import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { IHistory } from '../types'
import SolutionBox from './SolutionBox'

interface Props {
	isHistoryActive: boolean
	history: IHistory[]
	setIsHistoryActive: (value: boolean) => void
}

export default function CompleteHistory(props: Props) {
	const { isHistoryActive, history, setIsHistoryActive } = props

	return (
		<>
			{history?.map((item) => <SolutionBox key={item.question} historyItem={item} />)}
			<ChevronDownIcon
				onClick={() => setIsHistoryActive(!isHistoryActive)}
				className="h-8 w-8 rounded-md border border-zinc-700 p-1 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400"
			/>
		</>
	)
}
