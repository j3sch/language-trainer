import { useState, type KeyboardEvent, type MouseEvent } from 'react';
import { useCurrentTask } from 'src/atoms/currentTask';
import { usePreviousTask } from 'src/atoms/previousTask';
import { trpc } from 'src/utils/trpc';

interface Props {
  refetch: () => void;
}

export default function TranslateInput(props: Props) {
  const { refetch } = props;
  const [answer, setAnswer] = useState<string>('');
  const saveAnswer = trpc.translations.checkAnswer.useMutation();
  const [currentTask] = useCurrentTask();

  const [previousTask, setPreviousTask] = usePreviousTask();

  function onSubmit() {
    if (!(answer && currentTask)) return;

    const body = {
      question: currentTask.question,
      answer: answer,
      solution: currentTask.solution,
    };

    setAnswer('');
    refetch();

    saveAnswer.mutate(body, {
      onSuccess: (res) => {
        if (!res) return;
        setPreviousTask(res);
      },
    });
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      onSubmit();
    }
  }

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
            setAnswer(e.target.value);
          }}
          value={answer}
        />
      </div>
      <button
        onClick={onSubmit}
        type="button"
        className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-lg font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-zinc-800/40 dark:hover:bg-zinc-700/40"
      >
        Sumbit
      </button>
    </div>
  );
}
