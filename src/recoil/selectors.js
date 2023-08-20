import { selector } from 'recoil'
import { myVotePerfumeState } from './atoms'

export const setMyVotePerfumeState = selector({
  key: 'setMyVotePerfumeState',
  get: ({ get }) => get(myVotePerfumeState),
  set: ({ get, set }, newValue) => {
    const currentPerfume = get(myVotePerfumeState)
    const updatedPerfume = [...currentPerfume, newValue]
    set(myVotePerfumeState, updatedPerfume)
  },
})
