import { atom, useAtom } from 'jotai';
import { ITask } from 'src/types/languages';

const currentTaskAtom = atom<ITask | null>(null);

export function useCurrentTask() {
  return [...useAtom(currentTaskAtom)] as const;
}
