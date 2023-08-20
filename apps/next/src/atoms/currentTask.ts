import { atom, useAtom } from 'jotai';
import { IHistory } from 'src/types';
import { ITask } from 'src/types/languages';

const currentTaskAtom = atom<ITask | null>(null);

export function useCurrentTask() {
  return [...useAtom(currentTaskAtom)] as const;
}
