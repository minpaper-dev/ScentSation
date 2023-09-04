import { atom } from 'recoil';
import { PerfumeInterface, UserInterface } from '../pages/Main';


export const myVotePerfumeState = atom<PerfumeInterface[]>({
  key: 'myVotePerfumeState',
  default: [],
});

export const myInfoState = atom<UserInterface | null>({
  key: 'myInfoState',
  default: null,
});

export const isSelectModal = atom<boolean>({
  key: 'isSelectModal',
  default: false,
});
