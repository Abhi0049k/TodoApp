import { atom } from "recoil";

interface UserInfo {
  name: string;
  email: string;
}

export const userAtom = atom<UserInfo | null>({
  key: "userAtom",
  default: null,
});
