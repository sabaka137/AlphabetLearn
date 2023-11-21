import { IAlphabet, IRange } from "../types";

interface Props {}
// if the position of the first character is less than the second, the array is reverse - the function is needed to correctly select values in reverse order
export const CheckRevers = (Range: IRange, currentAlphabet: IAlphabet):IAlphabet => {
  if (Range.first.id !== null && Range.last.id !== null) {
    return Range.first.id > Range.last.id ? [...currentAlphabet].reverse() : [...currentAlphabet];
  } else {
    return [...currentAlphabet];
  }
};
