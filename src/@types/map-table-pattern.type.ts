import { IMapTablePatternInstance, IPerson } from './interfaces';

export type MapTablePattern = Record<keyof IPerson, IMapTablePatternInstance>;
