import { type IHistory } from '../types';
import { LightBulbIcon, StarIcon } from '@heroicons/react/24/outline';
import PopoverInfo from './Popover';
import { trpc } from 'src/utils/trpc';
import clsx from 'clsx';

interface Props {
  historyItem: IHistory;
  refetch?: () => void;
}

export default function SolutionBox(props: Props) {
  const { historyItem, refetch } = props;

  const saveAnswer = trpc.favorites.favoriteTask.useMutation();

  function onFavorite() {
    if (historyItem.id) {
      historyItem.favorite = !historyItem.favorite;
      saveAnswer.mutate(
        { id: historyItem.id },
        {
          onSuccess: () => {
            if (refetch) refetch();
          },
        },
      );
    }
  }

  return (
    <div className="w-full max-w-5xl flex flex-row cursor-pointer rounded-2xl border border-zinc-100 text-xl text-zinc-600 transition-colors  dark:border-zinc-700/40 dark:text-zinc-400">
      <div className="flex-1 grow">
        <div className="space-y-2 flex flex-col p-3 pb-6 text-center ">
          <div className="flex w-full justify-end ">
            {/* <PopoverInfo>
          <LightBulbIcon className="h-10 w-10 rounded-md p-2 text-zinc-500 hover:border-white/10 hover:bg-white/5  dark:text-zinc-400" />
        </PopoverInfo> */}
            <StarIcon
              onClick={onFavorite}
              className={clsx(
                historyItem.favorite ? 'text-yellow-500 dark:text-yellow-400' : 'text-zinc-500 dark:text-zinc-400',
                'h-10 w-10 rounded-md   p-2 hover:border-white/10 hover:bg-white/5',
              )}
            />
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
