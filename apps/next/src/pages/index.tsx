import TranslateInput from 'src/components/TranslateInput'
import { api } from 'src/utils/api'
import { type KeyboardEvent, type MouseEvent, useState, useEffect } from 'react'
import { markWords } from 'src/utils/algo'
import Footer from 'src/components/Footer'
import { ArrowRightOnRectangleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import LanguageSelect from 'src/components/LanguageSelect'
import TenseSelect from 'src/components/TenseSelect'
import CompleteHistory from 'src/components/CompleteHistory'
import HistoryPreview from 'src/components/HistoryPreview'
import { History } from 'src/types'
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect'
import { LANGUAGES } from 'src/types/languages'
import { getUser } from '~/utils/supabase'
import Settings from '~/components/Settings'
import { useAnswerLanguage, useQuestionLanguage } from '~/atoms/settings'
import SidebarNavigation from '~/components/SidebarNavigation'
import SolutionBox from '~/components/SolutionBox'

export default function Home() {
	const [answer, setAnswer] = useState<string>('')
	const saveAnswer = api.translations.saveAnswer.useMutation()
	const [previousTask, setpreviousTask] = useState<History | null>(null)
	const [isHistoryActive, setIsHistoryActive] = useState<boolean>(false)
	const [questionLanguage] = useQuestionLanguage()
	const [answerLanguage] = useAnswerLanguage()

	const { data, refetch } = api.translations.getRandomSentence.useQuery({
		langQ: questionLanguage,
		langA: answerLanguage,
	})

	const [tense, setTense] = useState<string>('random')
	const [showExplanation, setShowExplanation] = useState<boolean>(false)

	function onSubmit() {
		if (!(answer || data)) return

		const body = {
			question: data.question,
			answer: markWords(answer, data.solution),
			solution: data.solution,
		}

		setpreviousTask(body)

		setAnswer('')
		refetch()

		saveAnswer.mutate(body, {
			onSuccess: (res: any) => {
				if (!isResTypeCorrect(res)) console.error(res)
			},
		})
	}

	function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter') {
			onSubmit()
		}
	}

	return (
		<>
			<div className="flex-1">
				<SidebarNavigation />
			</div>
			<div className="col flex flex-col items-center md:w-1/2 ml-8">
				<div className="flex w-full flex-1">
					<div
						className={clsx(
							isHistoryActive ? 'justify-end space-y-6 py-8' : 'justify-center',
							'flex w-full flex-col  items-center',
						)}
					>
						{previousTask && <SolutionBox historyItem={previousTask} />}
					</div>
				</div>
				<div className="w-full flex-col justify-center space-y-12 rounded-xl border border-zinc-100 bg-zinc-800/40 p-12 font-medium dark:border-zinc-700/40">
					{data && (
						<>
							<span className="flex flex-grow justify-center text-center text-2xl text-white">
								{data.question}
							</span>
							<TranslateInput
								onKeyDown={onKeyDown}
								onClick={onSubmit}
								setAnswer={setAnswer}
								answer={answer}
							/>
						</>
					)}
				</div>
				<Footer />
			</div>
			<Settings isHistoryActive={isHistoryActive} refetch={refetch} />
		</>
	)
}
