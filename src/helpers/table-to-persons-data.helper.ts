import { emptyDataValues, indexHeader, mapTableHeaderToKeyAndIndexes, rowToRawData, tableFileToJson } from '.';
import { IPerson, IPersonData } from '../@types';
import { PersonData } from '../classes';
import { getPersonLocation } from './get-person-location.helper';
import { Logger } from './logger.helper';

const logger = new Logger('tableToPersonsData');

export function tableToPersonsData(filepath: string, file_id: number): IPersonData[] {
  const personsData: IPersonData[] = [];
  const tablesJson = tableFileToJson(filepath);
  tablesJson.forEach((tableJson: any[][]) => {
    const headers = tableJson[indexHeader];
    if (!headers) {
      return false;
    }
    const keyAndIndexes = mapTableHeaderToKeyAndIndexes(headers);
    if (Object.keys(keyAndIndexes).every((key) => !keyAndIndexes[key].length)) {
      logger.warn('The table header has no database key mappings');
    }
    logger.log(`Processing file: ${filepath} (${tableJson.length - 1} rows)`);
    for (let index in tableJson) {
      const indexRow = parseInt(index);
      if ((indexRow - 1) % 100 === 0 && indexRow - 1 !== 0) {
        logger.info(`${indexRow - 1} rows processed`);
      }
      if (indexRow === indexHeader) continue;
      const personData = new PersonData(file_id, rowToRawData(tableJson[indexRow], tableJson[indexHeader]));
      Object.keys(keyAndIndexes).forEach((key) => {
        const data = keyAndIndexes[key].map((index: number) => tableJson[indexRow][index]).join(', ');
        personData[key as keyof IPerson] = emptyDataValues.includes(data) ? '' : data;
      });
      personData.location = getPersonLocation(personData);
      personsData.push(personData);
    }
  });
  logger.log('File processing completed');
  return personsData;
}
