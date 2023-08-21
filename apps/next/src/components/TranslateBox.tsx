import TranslateInput from './TranslateInput';
import { useCurrentTask } from 'src/atoms/currentTask';

interface Props {
  refetch: () => void;
}

export default function TranslateBox(props: Props) {
  const { refetch } = props;

  const [currentTask] = useCurrentTask();

  

  return (
    <div className="w-full max-w-5xl justify-center space-y-12 rounded-xl border border-zinc-100 bg-zinc-800/40 p-12 font-medium dark:border-zinc-700/40">
      {currentTask && (
        <>
          <span className="flex flex-grow justify-center text-center text-2xl text-white">{currentTask.question}</span>
          <TranslateInput refetch={refetch} />
        </>
      )}
    </div>
  );
}
