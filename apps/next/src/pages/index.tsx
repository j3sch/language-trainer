import TranslateInput from 'src/components/TranslateInput'
import { api } from 'src/utils/api'
import { type KeyboardEvent, useState, useEffect } from 'react'
import { markWords } from 'src/utils/algo'
import Footer from 'src/components/Footer'
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import LanguageSelect from 'src/components/LanguageSelect'
import TenseSelect from 'src/components/TenseSelect'
import CompleteHistory from 'src/components/CompleteHistory'
import HistoryPreview from 'src/components/HistoryPreview'
import { History } from 'src/types'
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect'
import { LANGUAGES } from 'src/types/languages'
import { getUser } from '~/utils/supabase'

export default function Home() {
  const [answer, setAnswer] = useState<string>('')
  const saveAnswer = api.translations.saveAnswer.useMutation()
  const [history, setHistory] = useState<History[] | null>(null)
  const [isHistoryActive, setIsHistoryActive] = useState<boolean>(false)
  const [questionLanguage, setQuestionLanguage] = useState<LANGUAGES>('German')
  const [answerLanguage, setAnswerLanguage] = useState<LANGUAGES>('English')

  const { data, refetch } = api.translations.getRandomSentence.useQuery({
    langQ: questionLanguage,
    langA: answerLanguage,
  })

  const [tense, setTense] = useState<string>('random')
  const [showExplanation, setShowExplanation] = useState<boolean>(false)

  function onSubmit() {
    if (!data) return
    const body = {
      question: data.question,
      answer: markWords(answer, data.solution),
      solution: data.solution,
    }

    if (history) {
      setHistory([...history, body])
    } else {
      setHistory([body])
    }

    setAnswer('')
    refetch()

    saveAnswer.mutate(body, {
      onSuccess: (res: any) => {
        if (!isResTypeCorrect(res)) console.error(res)
      },
    })
  }

  function onEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter' && answer && data) {
      onSubmit()
    }
  }

  function onClick() {
    if (answer && data) {
      onSubmit()
    }
  }

  function switchLanguage() {
    const questionLanguageState = questionLanguage
    setQuestionLanguage(answerLanguage)
    setAnswerLanguage(questionLanguageState)
  }

  return (
    <>
      <div className="flex h-screen w-screen bg-zinc-900">
        <div className="flex-1"></div>
        <div className="col flex flex-col items-center md:w-1/2">
          <div className="flex w-full flex-1">
            <div
              className={clsx(
                isHistoryActive ? 'justify-end space-y-6 py-8' : 'justify-center',
                'flex w-full flex-col  items-center'
              )}
            >
              {/* {checkAnswer.isLoading ? (
                <div className="flex w-full cursor-pointer flex-col space-y-2 rounded-2xl border border-zinc-100 p-6 text-center text-xl text-zinc-600 transition-colors hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400">
                  <span>Checking...</span>
                </div>
              ) : ( */}
              <>
                {history && history.length > 0 && (
                  <>
                    {isHistoryActive ? (
                      <CompleteHistory
                        history={history}
                        {...{ isHistoryActive, setIsHistoryActive }}
                      />
                    ) : (
                      <HistoryPreview
                        history={history}
                        {...{ isHistoryActive, setIsHistoryActive }}
                      />
                    )}
                  </>
                )}
              </>
              {/* )} */}
            </div>
          </div>
          {!isHistoryActive && (
            <>
              <div className="w-full flex-col justify-center space-y-12 rounded-xl border border-zinc-100 bg-zinc-800/40 p-12 font-medium dark:border-zinc-700/40">
                {data && (
                  <>
                    <span className="flex flex-grow justify-center text-center text-2xl text-white">
                      {data.question}
                    </span>
                    <TranslateInput
                      onSubmit={onEnter}
                      onClick={onClick}
                      setAnswer={setAnswer}
                      answer={answer}
                    />
                  </>
                )}
              </div>
              <Footer />
            </>
          )}
        </div>
        <div className="mx-12 flex flex-1 items-center justify-center">
          {!isHistoryActive && (
            <div className="flex w-full max-w-2xl flex-col space-y-5">
              <div className="flex w-full columns-3 items-center">
                <div className="basis-2/5">
                  <LanguageSelect
                    defaultValue="German"
                    value={questionLanguage}
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
                    onValueChange={(v) => setAnswerLanguage(v)}
                  />
                </div>
              </div>
              <TenseSelect />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
