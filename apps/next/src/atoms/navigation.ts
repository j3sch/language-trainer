import { atom, useAtom } from 'jotai';
import { TNavigation } from 'src/types/navigation';

const navigationAtom = atom<TNavigation>('learning');

export function useNavigation() {
  return [...useAtom(navigationAtom)] as const;
}
