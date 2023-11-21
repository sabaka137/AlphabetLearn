export type IAlphabet = { id: number; jap: string; ru: string,active:boolean,highlight:boolean }[][];
export type IAlphabetPart = {
  id: number;
  jap: string;
  ru: string;
  active: boolean;
  highlight: boolean;
}[];
export type IAlphabetItem = {
    id: number;
    jap: string;
    ru: string;
    active: boolean;
    highlight: boolean;
  }
export type IRange = {
    first:{char:null | string,id:null | number}
    last:{char:null | string,id:null | number}
}