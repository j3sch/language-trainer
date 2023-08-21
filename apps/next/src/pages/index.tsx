import { trpc } from 'src/utils/trpc';
import {  useEffect } from 'react';
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

export default function Home() {
  const [previousTask, setpreviousTask] = usePreviousTask();
  const [navigation] = useNavigation();
  const [questionLanguage] = useQuestionLanguage();
  const [answerLanguage] = useAnswerLanguage();

  const { data, refetch } = trpc.translations.getRandomSentence.useQuery({
    langQ: questionLanguage,
    langA: answerLanguage,
  });
  const [currentTask, setCurrentTask] = useCurrentTask();

  useEffect(() => {
    if (data) {
      setCurrentTask(data);
    }
  }, [data]);

  return (
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
  );
}
