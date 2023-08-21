import TranslateInput from './TranslateInput';
import { trpc } from 'src/utils/trpc';
import { type KeyboardEvent, type MouseEvent, useState, useEffect, Context } from 'react';
import { markWords } from 'src/utils/algo';
import Footer from 'src/components/Footer';
import { IHistory } from 'src/types';
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect';
import Settings from 'src/components/Settings';
import { useAnswerLanguage, useQuestionLanguage } from 'src/atoms/settings';
import SidebarNavigation from 'src/components/SidebarNavigation';
import SolutionBox from 'src/components/SolutionBox';
import SidebarLayout from 'src/layouts/Sidebar';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { getSession, supabase } from 'src/utils/supabase/auth';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { useNavigation } from 'src/atoms/navigation';
import { usePreviousTask } from 'src/atoms/previousTask';
import { ITask } from 'src/types/languages';
import { useCurrentTask } from 'src/atoms/currentTask';

interface Props {
  refetch: () => void;
}

export default function TranslateBox(props: Props) {
  const { refetch } = props;
  const saveAnswer = trpc.translations.saveAnswer.useMutation();

  const [answer, setAnswer] = useState<string>('');
  const [previousTask, setpreviousTask] = usePreviousTask();
  const [currentTask, setCurrentTask] = useCurrentTask();

  function onSubmit() {
    if (!(answer && currentTask)) return;

    const body = {
      question: currentTask.question,
      answer: markWords(answer, currentTask.solution),
      solution: currentTask.solution,
    };


    setAnswer('');
    refetch();

    saveAnswer.mutate(body, {
      onSuccess: (res) => {
        if (!res) return;
        setpreviousTask({
          id: res.id,
          ...body,
          favorite: false,
        });
      },
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }

  return (
    <div className="w-full max-w-5xl justify-center space-y-12 rounded-xl border border-zinc-100 bg-zinc-800/40 p-12 font-medium dark:border-zinc-700/40">
      {currentTask && (
        <>
          <span className="flex flex-grow justify-center text-center text-2xl text-white">{currentTask.question}</span>
          <TranslateInput onKeyDown={onKeyDown} onClick={onSubmit} setAnswer={setAnswer} answer={answer} />
        </>
      )}
    </div>
  );
}
