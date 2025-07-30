import { atom, useAtom } from 'jotai';
import { ITask } from 'src/types/languages';

const chatAtom = atom<IChat[] | null>(null);

export function useChat() {
  return [...useAtom(chatAtom)] as const;
}
