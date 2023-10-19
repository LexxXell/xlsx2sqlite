import { MapTablePattern } from '../@types';
import { Database } from '../classes';
import { Logger } from './logger.helper';

export const mapTablePattern: MapTablePattern = {
  name: { include: ['name', 'member', 'customer'], exclude: ['number', 'project', 'building', 'company'] },
  email: { include: ['mail'], exclude: [] },
  phone: {
    include: ['tel', 'number', 'phone'],
    exclude: ['plot', 'member', 'registration', 'del', 'p-', 'unit', 'toll', 'mob', 'company'],
  },
  mobile: { include: ['mob'], exclude: ['plot', 'member', 'registration', 'del', 'p-', 'unit', 'toll'] },
  location: {
    include: ['addr', 'city', 'region', 'country', 'state', 'district', 'location'],
    exclude: ['email', 'company'],
  },
};

export const xlsxDirectoryPath = '/home/lexx/Загрузки/xlsxArcheves/xlsx2sql/data';

export const indexHeader = 0;

export const myDatabase = new Database('db/mydatabase.db', new Logger('Database'));

export const createDbQuery = `
    CREATE TABLE IF NOT EXISTS person (
    name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    mobile TEXT DEFAULT NULL,
    location TEXT DEFAULT NULL,
    raw_data TEXT DEFAULT NULL,
    filepath TEXT DEFAULT NULL
);
`;

export const transactionStep = 100;

export const permittedExt = ['.xlsx', '.xls', '.csv', '.ods'];
