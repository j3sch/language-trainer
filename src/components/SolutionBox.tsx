import { History } from "../types";

interface Props {
  historyItem: History;
}

export default function SolutionBox(props: Props) {
  const { historyItem } = props;

  return (
    <div className="flex w-full cursor-pointer flex-col space-y-2 rounded-2xl border border-zinc-100 p-6 text-center text-xl text-zinc-600 transition-colors hover:border-white/10 hover:bg-white/5 dark:border-zinc-700/40 dark:text-zinc-400">
      <span>{historyItem.question}</span>
      <span>
        <div
          dangerouslySetInnerHTML={{
            __html: historyItem.answer,
          }}
        />
      </span>
      <span>{historyItem.solution}</span>
    </div>
  );
}
