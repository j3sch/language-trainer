import { atom, useAtom } from 'jotai'

const currentNav = atom('Learning')

export function useCurrentNav() {
	return [...useAtom(currentNav)] as const
}
