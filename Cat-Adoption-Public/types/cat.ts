import type { IAdopt } from "./adopt";

export interface ICat {
  id?: number;
  image: string;
  name: string;
  description: string;
  isAdopted: boolean;
  Adopt?: IAdopt[];
}
