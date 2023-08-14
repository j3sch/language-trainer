import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'
import React from 'react'
import Button from './Button'
import useTranslation from 'next-translate/useTranslation'

export default function TenseSelect() {
  const { t } = useTranslation('settings')
  const contentList: string[] = t('tenses', {}, { returnObjects: true })

  return (
    <SelectPrimitive.Root defaultValue={contentList[0]}>
      <SelectPrimitive.Trigger asChild aria-label="Tenses">
        <Button>
          <SelectPrimitive.Value />
          <SelectPrimitive.Icon className="ml-2">
            <ChevronDownIcon />
          </SelectPrimitive.Icon>
        </Button>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Content>
        <SelectPrimitive.ScrollUpButton className="flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <ChevronUpIcon />
        </SelectPrimitive.ScrollUpButton>
        <SelectPrimitive.Viewport className="rounded-lg bg-white p-2 shadow-lg dark:bg-zinc-800">
          <SelectPrimitive.Group>
            {contentList.map((f, i) => (
              <SelectPrimitive.Item
                disabled={f === 'Grapes'}
                key={`${f}-${i}`}
                value={f}
                className={clsx(
                  'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900',
                  'radix-disabled:opacity-50',
                  'select-none focus:outline-none'
                )}
              >
                <SelectPrimitive.ItemText>{f}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  )
}
