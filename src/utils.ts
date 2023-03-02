import { atom } from "recoil";

export const offsetState = atom({
  key: "offset",
  default: 6,
});

export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}${id}`;
}
