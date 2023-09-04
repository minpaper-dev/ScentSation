import { selector } from 'recoil'
import { myVotePerfumeState } from './atoms'
import { PerfumeInterface } from '../pages/Main'

export const setMyVotePerfumeState = selector<PerfumeInterface[]>({
  key: 'setMyVotePerfumeState',
  get: ({ get }) => get(myVotePerfumeState),
  set: ({ set }, newValue) => {
    set(myVotePerfumeState, newValue)
  },
})
