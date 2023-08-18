import TranslateInput from 'src/components/TranslateInput'
import { api } from 'src/utils/api'
import { type KeyboardEvent, type MouseEvent, useState, useEffect } from 'react'
import { markWords } from 'src/utils/algo'
import Footer from 'src/components/Footer'
import { ArrowRightOnRectangleIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline'
import { clsx } from 'clsx'
import LanguageSelect from 'src/components/LanguageSelect'
import TenseSelect from 'src/components/TenseSelect'
import CompleteHistory from 'src/components/CompleteHistory'
import { IHistory } from 'src/types'
import { isResTypeCorrect } from 'src/utils/isResTypeCorrect'
import { LANGUAGES } from 'src/types/languages'
import Settings from '@/components/Settings'
import { useAnswerLanguage, useQuestionLanguage } from '@/atoms/settings'
import SidebarNavigation from '@/components/SidebarNavigation'
import SolutionBox from '@/components/SolutionBox'

export default function History() {
	const { data, refetch } = api.translations.getHistories.useQuery()

	return (
		<div className="overflow-x-hidden h-full w-full">
			<div className="fixed flex-1 h-full">
				<SidebarNavigation />
			</div>
			<div className="flex flex-col items-center my-20 mx-64">
				<div className="space-y-8 flex flex-col">
					{data && data.map((values) => <SolutionBox key={values.id} historyItem={values} />)}
				</div>
			</div>
			<Footer />
		</div>
	)
}
