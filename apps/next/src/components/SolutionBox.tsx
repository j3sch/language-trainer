import { type IHistory } from '../types';
import { LightBulbIcon, StarIcon } from '@heroicons/react/24/outline';
import PopoverInfo from './Popover';

interface Props {
  historyItem: IHistory;
}

export default function SolutionBox(props: Props) {
  const { historyItem } = props;

  return (
    <div className="w-full max-w-5xl flex flex-row cursor-pointer rounded-2xl border border-zinc-100 text-xl text-zinc-600 transition-colors  dark:border-zinc-700/40 dark:text-zinc-400">
      <div className="flex-1 grow">
        <div className="space-y-2 flex flex-col p-3 pb-6 text-center ">
          <div className="flex w-full justify-end ">
            {/* <PopoverInfo>
          <LightBulbIcon className="h-10 w-10 rounded-md p-2 text-zinc-500 hover:border-white/10 hover:bg-white/5  dark:text-zinc-400" />
        </PopoverInfo> */}
            <StarIcon className="h-10 w-10 rounded-md   p-2 text-zinc-500 hover:border-white/10 hover:bg-white/5   dark:text-zinc-400" />
          </div>
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
      </div>
    </div>
  );
}
