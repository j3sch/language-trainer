import { trpc } from 'src/utils/trpc';
import { Key, useEffect, useState } from 'react';
import Footer from 'src/components/Footer';
import { useAnswerLanguage, useQuestionLanguage } from 'src/atoms/settings';
import SolutionBox from 'src/components/SolutionBox';
import SidebarLayout from 'src/layouts/Sidebar';
import TranslateBox from 'src/components/TranslateBox';
import History from 'src/components/History';
import { usePreviousTask } from 'src/atoms/previousTask';
import { useNavigation } from 'src/atoms/navigation';
import { useCurrentTask } from 'src/atoms/currentTask';
import Favorites from 'src/components/Favorites';
import { PaperAirplaneIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/solid';
import { useChat } from 'src/atoms/chat';
import clsx from 'clsx';

export default function Home() {
  const [previousTask, setpreviousTask] = usePreviousTask();
  const [navigation] = useNavigation();
  const [questionLanguage] = useQuestionLanguage();
  const [answerLanguage] = useAnswerLanguage();

  const { data, refetch } = trpc.translations.getRandomSentence.useQuery({
    langQ: questionLanguage,
    langA: answerLanguage,
  });

  const saveAnswer = trpc.translations.checkAnswer.useMutation();

  const [currentTask, setCurrentTask] = useCurrentTask();
  const [answer, setAnswer] = useState('');
  const [chat, setChat] = useChat();

  useEffect(() => {
    if (data) {
      if (chat) {
        setChat([...chat, { question: data.question }]);
      } else {
        setChat([{ question: data.question }]);
      }
    }
  }, [data]);

  function onSubmit() {
    if (!chat || !answer || !currentTask) return;

    const body = {
      question: currentTask.question,
      answer: answer,
      solution: currentTask.solution,
    };

    const last = chat[chat.length - 1];

    saveAnswer.mutate(body, {
      onSuccess: (res) => {
        if (!res) return;
        last.answer = res.answer;
        last.solution = res.solution;
        setChat([...chat.slice(0, -1), last]);
        setAnswer('');
        setTimeout(() => {
          refetch();
        }, 500);
      },
    });
    //replace last object from chat with last
  }

  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col flex-1 p-5 overflow-x-hidden">
        <div className="space-y-6 flex-col flex flex-1">
          {chat?.map((item, index) => (
            <>
              <div className="flex max-w-[85%] text-zinc-100 ">{item.question}</div>
              {item.answer && (
                <div className="self-end bg-zinc-800 p-3 rounded-xl max-w-[85%]">
                  {item.answer.map((word) => (
                    <span key={word.id} className={clsx(word.color === 'red' ? 'text-rose-500' : 'text-zinc-500')}>
                      {word.word}{' '}
                    </span>
                  ))}
                </div>
              )}
              {item.solution && <div className="flex max-w-[85%] text-emerald-400">{item.solution}</div>}
            </>
          ))}
        </div>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            type="text"
            name="account-number"
            id="account-number"
            className="block w-full border-0 py-2.5 pr-10 bg-zinc-800 text-white rounded-xl placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Translation"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
          />
          <div onClick={onSubmit} className="absolute inset-y-0 right-0 flex items-center  pr-3">
            <PaperAirplaneIcon
              className={clsx(answer.length > 0 ? 'text-zinc-100' : 'text-zinc-400', 'h-5 w-5')}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {/* Desktop */}
      <div className="hidden md:flex flex-1 ">
        <SidebarLayout>
          {navigation === 'learning' && (
            <div className="flex-1 flex flex-col w-full items-center h-full">
              <div className="flex-1 flex-col flex items-center justify-center w-full">
                {previousTask && <SolutionBox historyItem={previousTask} />}
              </div>
              <TranslateBox refetch={refetch} />
              <div className="flex-1 justify-items-end flex">
                <Footer />
              </div>
            </div>
          )}
          {navigation === 'history' && (
            <div className="overflow-y-auto flex w-full min-h-full">
              <div className="w-full flex flex-col mr-96">
                <History />
                <Footer />
              </div>
            </div>
          )}
          {navigation === 'favorites' && (
            <div className="overflow-y-auto flex w-full min-h-full">
              <div className="w-full flex flex-col mr-96">
                <Favorites />
                <Footer />
              </div>
            </div>
          )}
        </SidebarLayout>
      </div>
    </>
  );
}
