import { IPerson } from '.';

export interface IPersonData extends IPerson {
  raw_data: string;
  file_id: number;
}
