import { atom, useAtom } from 'jotai'

const questionLanguageAtom = atom('German')

export function useQuestionLanguage() {
  return [...useAtom(questionLanguageAtom)] as const
}

const answerLanguageAtom = atom('English')

export function useAnswerLanguage() {
  return [...useAtom(answerLanguageAtom)] as const
}
