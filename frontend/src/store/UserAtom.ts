import { atom } from "recoil";
import {UserInfo} from '../shared/types'

export const userAtom = atom<UserInfo | null>({
  key: "userAtom",
  default: null,
});
