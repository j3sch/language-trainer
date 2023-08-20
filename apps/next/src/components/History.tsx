import TranslateInput from 'src/components/TranslateInput';
import { trpc } from 'src/utils/trpc';
import { type KeyboardEvent, type MouseEvent, useState, useEffect } from 'react';
import { markWords } from 'src/utils/algo';
import Footer from 'src/components/Footer';
import { ArrowRightOnRectangleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { clsx } from 'clsx';
import LanguageSelect from 'src/components/LanguageSelect';
import TenseSelect from 'src/components/TenseSelect';
import CompleteHistory from 'src/components/CompleteHistory';
import { IHistory } from 'src/types';
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect';
import { LANGUAGES } from 'src/types/languages';
import Settings from 'src/components/Settings';
import { useAnswerLanguage, useQuestionLanguage } from 'src/atoms/settings';
import SidebarNavigation from 'src/components/SidebarNavigation';
import SolutionBox from 'src/components/SolutionBox';

export default function History() {
  const { data, refetch } = trpc.translations.getHistories.useQuery();

  return (
    <div className="w-full my-20">
      <div className="space-y-8 flex-col w-full flex items-center">
        {data && data.map((values) => <SolutionBox key={values.id} historyItem={values} />)}
      </div>
    </div>
  );
}
