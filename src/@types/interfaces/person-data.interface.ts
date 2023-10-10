import { IPerson } from '.';

export interface IPersonData extends IPerson {
  raw_data: string;
  filepath: string;
}
