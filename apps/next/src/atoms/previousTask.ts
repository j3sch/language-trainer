import { atom, useAtom } from 'jotai';
import { IHistory } from 'src/types';

const previousTaskAtom = atom<IHistory | null>(null);

export function usePreviousTask() {
  return [...useAtom(previousTaskAtom)] as const;
}
