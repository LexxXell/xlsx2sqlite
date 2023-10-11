import path from 'path';

export function checkFileExt(filepath: string, extSet: Array<string>): Boolean {
  return extSet.some((ext: string) => ext.toLowerCase === path.extname(filepath).toLowerCase);
}
