import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import { clsx } from 'clsx';
import React from 'react';
import Button from './Button';
import ReactCountryFlag from 'react-country-flag';
import { LANGUAGES } from 'src/types/languages';

interface Props {
  defaultValue: string;
  value: string;
  againstValue: string;
  onValueChange: (value: LANGUAGES) => void;
}

export default function LanguageSelect(props: Props) {
  const { defaultValue, onValueChange, value, againstValue } = props;

  return (
    <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger asChild aria-label="Language">
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
        <SelectPrimitive.Viewport className="w-full rounded-lg bg-white p-2 shadow-lg dark:bg-zinc-800">
          <SelectPrimitive.Group>
            {/* English */}
            <SelectPrimitive.Item
              value="English"
              disabled={'English' === againstValue}
              className={clsx(
                'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900',
                'radix-disabled:opacity-50',
                'select-none focus:outline-none',
              )}
            >
              <ReactCountryFlag countryCode="US" className="mr-1.5" />
              <SelectPrimitive.ItemText>english</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
            {/* French */}
            {/* <SelectPrimitive.Item
              value="French"
              className={clsx(
                "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <ReactCountryFlag countryCode="FR" className="mr-1.5" />
              <SelectPrimitive.ItemText>{t`french`}</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item> */}
            {/* German */}
            <SelectPrimitive.Item
              value="German"
              disabled={'German' === againstValue}
              className={clsx(
                'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900',
                'radix-disabled:opacity-50',
                'select-none focus:outline-none',
              )}
            >
              <ReactCountryFlag countryCode="DE" className="mr-1.5" />
              <SelectPrimitive.ItemText>german</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>

            {/* Spanish */}
            <SelectPrimitive.Item
              value="Spanish"
              disabled={'Spanish' === againstValue}
              className={clsx(
                'relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900',
                'radix-disabled:opacity-50',
                'select-none focus:outline-none',
              )}
            >
              <ReactCountryFlag countryCode="ES" className="mr-1.5" />
              <SelectPrimitive.ItemText>Spanish</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
            {/* Italian 
            <SelectPrimitive.Item
              value="Italian"
              className={clsx(
                "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <ReactCountryFlag countryCode="IT" className="mr-1.5" />
              <SelectPrimitive.ItemText>Italian</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
            Dutch
            <SelectPrimitive.Item
              value="Dutch"
              className={clsx(
                "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <ReactCountryFlag countryCode="NL" className="mr-1.5" />
              <SelectPrimitive.ItemText>Dutch</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item>
            Portuguese
            <SelectPrimitive.Item
              value="Portuguese"
              className={clsx(
                "relative flex items-center rounded-md px-8 py-2 text-sm font-medium text-zinc-700 focus:bg-zinc-100 dark:text-zinc-300 dark:focus:bg-zinc-900",
                "radix-disabled:opacity-50",
                "select-none focus:outline-none"
              )}
            >
              <ReactCountryFlag countryCode="PT" className="mr-1.5" />
              <SelectPrimitive.ItemText>Portuguese</SelectPrimitive.ItemText>
              <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
                <CheckIcon />
              </SelectPrimitive.ItemIndicator>
            </SelectPrimitive.Item> */}
          </SelectPrimitive.Group>
        </SelectPrimitive.Viewport>
        <SelectPrimitive.ScrollDownButton className="flex items-center justify-center text-zinc-700 dark:text-zinc-300">
          <ChevronDownIcon />
        </SelectPrimitive.ScrollDownButton>
      </SelectPrimitive.Content>
    </SelectPrimitive.Root>
  );
}
