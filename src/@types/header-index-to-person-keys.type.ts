import { IPerson } from './interfaces';

export type HeaderIndexToPersonKeys = Record<keyof IPerson, number[] | null>;
