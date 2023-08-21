import { atom, useAtom } from 'jotai';

export type TNavigation = 'learning' | 'history' | 'favorites';

const navigationAtom = atom<TNavigation>('learning');

export function useNavigation() {
  return [...useAtom(navigationAtom)] as const;
}
