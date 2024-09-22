import type { ICat } from "./cat";

export interface IAdopt {
  id: number;
  fullname: string;
  email: string;
  telephone: string;
  reason: string;
  catID: number;
}

export interface IAdoptRequest extends IAdopt {
  cat: ICat;
}
