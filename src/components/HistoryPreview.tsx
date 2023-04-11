import { ChevronUpIcon } from "@heroicons/react/24/outline";
import React from "react";
import { History } from "~/types";
import SolutionBox from "./SolutionBox";

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
      <SolutionBox historyItem={history[history.length - 1]!} />
    </div>
  );
}
