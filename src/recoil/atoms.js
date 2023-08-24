import { atom } from 'recoil'

export const myVotePerfumeState = atom({
  key: 'myVotePerfumeState',
  default: [],
})

export const myInfoState = atom({
  key: 'myInfoState',
  default: {},
})

export const isSelectModal = atom({
  key: 'isSelectModal',
  default: false,
})
