import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import LanguageSelect from 'src/components/LanguageSelect';
import { useAnswerLanguage, useQuestionLanguage } from 'src/atoms/settings';
import { trpc } from 'src/utils/trpc';
import { useCurrentTask } from 'src/atoms/currentTask';
import { useEffect } from 'react';

export default function Settings() {
  const [questionLanguage, setQuestionLanguage] = useQuestionLanguage();
  const [answerLanguage, setAnswerLanguage] = useAnswerLanguage();

  function switchLanguage() {
    const questionLanguageState = questionLanguage;
    setQuestionLanguage(answerLanguage);
    setAnswerLanguage(questionLanguageState);
    refetch();
  }

  const { data, refetch } = trpc.translations.getRandomSentence.useQuery({
    langQ: questionLanguage,
    langA: answerLanguage,
  });
  const [currentTask, setCurrentTask] = useCurrentTask();

  useEffect(() => {
    if (data) {
      setCurrentTask(data);
    }
  }, [data]);

  return (
    <div className="flex-col flex">
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
      </div>
    </div>
  );
}
