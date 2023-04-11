import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { History } from "~/types";

interface Props {
  isHistoryActive: boolean;
  history: History[];
  setIsHistoryActive: (value: boolean) => void;
}

export default function CompleteHistory(props: Props) {
  const { isHistoryActive, history, setIsHistoryActive } = props;

  return (
    <>
      {history?.map((item, index) => (
        <div
          key={index}
          className="flex w-full cursor-pointer flex-col space-y-2 rounded-2xl border border-zinc-100 p-6 text-center text-xl text-zinc-600 transition-colors hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400"
        >
          <span>{item.question}</span>
          <span>
            <div
              dangerouslySetInnerHTML={{
                __html: item.answer,
              }}
            />
          </span>
          <span>{item.solution}</span>
        </div>
      ))}
      <ChevronDownIcon
        onClick={() => setIsHistoryActive(!isHistoryActive)}
        className="h-8 w-8 rounded-md border border-zinc-700 p-1 text-zinc-500 hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400"
      />
    </>
  );
}
