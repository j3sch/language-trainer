import TranslateInput from 'src/components/TranslateInput'
import { trpc } from 'src/utils/trpc'
import { type KeyboardEvent, type MouseEvent, useState, useEffect } from 'react'
import { markWords } from 'src/utils/algo'
import Footer from 'src/components/Footer'
import { IHistory } from 'src/types'
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect'
import Settings from 'src/components/Settings'
import { useAnswerLanguage, useQuestionLanguage } from 'src/atoms/settings'
import SidebarNavigation from 'src/components/SidebarNavigation'
import SolutionBox from 'src/components/SolutionBox'

export default function Home() {
  const [answer, setAnswer] = useState<string>('')
  const saveAnswer = trpc.translations.saveAnswer.useMutation()
  const [previousTask, setpreviousTask] = useState<IHistory | null>(null)
  const [isHistoryActive, setIsHistoryActive] = useState<boolean>(false)
  const [questionLanguage] = useQuestionLanguage()
  const [answerLanguage] = useAnswerLanguage()

  const { data, refetch } = trpc.translations.getRandomSentence.useQuery({
    langQ: questionLanguage,
    langA: answerLanguage,
  })

  const [tense, setTense] = useState<string>('random')
  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  function onSubmit() {
    if (!(answer && data)) return

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
      <div className="col flex flex-col items-center w-full ml-8">
        <div className="flex w-full flex-1">
          <div className="justify-center flex w-full flex-col  items-center">
            {previousTask && <SolutionBox historyItem={previousTask} />}
          </div>
        </div>
        <div className="w-full max-w-4xl flex-col justify-center space-y-12 rounded-xl border border-zinc-100 bg-zinc-800/40 p-12 font-medium dark:border-zinc-700/40">
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
