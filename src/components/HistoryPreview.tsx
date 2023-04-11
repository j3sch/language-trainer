import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { History } from "~/types";

interface Props {
  isHistoryActive: boolean;
  history: History[];
  setIsHistoryActive: (value: boolean) => void;
}

export default function HistoryPreview(props: Props) {
  const { isHistoryActive, history, setIsHistoryActive } = props;

  return (
    <div className="flex w-full flex-col items-center space-y-4 ">
      {history && history.length > 1 && (
        <ChevronUpIcon
          onClick={() => setIsHistoryActive(!isHistoryActive)}
          className="h-8 w-8 rounded-md border border-zinc-700 p-1 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400"
        />
      )}
      <div className="flex w-full cursor-pointer flex-col space-y-2 rounded-2xl border border-zinc-100 p-6 text-center text-xl text-zinc-600 transition-colors hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400">
        <span>{history[history.length - 1]!.question}</span>
        <span>
          <div
            dangerouslySetInnerHTML={{
              __html: history[history.length - 1]!.answer,
            }}
          />
        </span>
        <span>{history[history.length - 1]!.solution}</span>
      </div>
    </div>
  );
}
