import { ArrowRightOnRectangleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import LanguageSelect from 'src/components/LanguageSelect'
import TenseSelect from 'src/components/TenseSelect'
import { signOut } from '@/utils/supabase'
import { useAnswerLanguage, useQuestionLanguage } from '@/atoms/settings'
import { useUser } from '@/utils/supabase/auth'
import { useRouter } from 'next/router'

interface Props {
	isHistoryActive: boolean
	refetch: () => void
}

export default function Settings(props: Props) {
	const { isHistoryActive, refetch } = props
	const { loading, user, setUser } = useUser()
	const { push } = useRouter()

	const [questionLanguage, setQuestionLanguage] = useQuestionLanguage()
	const [answerLanguage, setAnswerLanguage] = useAnswerLanguage()

	function switchLanguage() {
		const questionLanguageState = questionLanguage
		setQuestionLanguage(answerLanguage)
		setAnswerLanguage(questionLanguageState)
		refetch()
	}

	return (
		<div className="mx-8 xl:mx-12 flex-col flex flex-1">
			{!isHistoryActive && (
				<>
					<div className="flex justify-end h-24 items-end">
						{/* <button
							onClick={onSignOut}
							className="items-center h-10 flex flex-row space-x-2 rounded-md border border-zinc-700 pl-3 p-2 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:bg-zinc-800/40 dark:text-zinc-400"
						>
							<span>Logout</span>
							<ArrowRightOnRectangleIcon className="h-10 py-2" />
						</button> */}
					</div>

					<div className="flex w-full justify-center h-full max-w-2xl flex-col space-y-5">
						<div className="flex w-full columns-3 space-x-2 items-center">
							<div className="basis-2/5">
								<LanguageSelect
									defaultValue="German"
									value={questionLanguage}
									againstValue={answerLanguage}
									onValueChange={(v) => setQuestionLanguage(v)}
								/>
							</div>
							<div className="flex basis-1/5 justify-center">
								<ArrowsRightLeftIcon
									onClick={switchLanguage}
									className="h-10 w-10 rounded-md border border-zinc-700 p-2 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:bg-zinc-800/40 dark:text-zinc-400"
								/>
							</div>

							<div className="basis-2/5">
								<LanguageSelect
									defaultValue="English"
									value={answerLanguage}
									againstValue={questionLanguage}
									onValueChange={(v) => setAnswerLanguage(v)}
								/>
							</div>
						</div>
						<TenseSelect />
					</div>
					<div className="h-24" />
				</>
			)}
		</div>
	)
}
