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

export const emptyDataValues = ['*', 'undefined'];

/* ** xlsxDirectoryPath & dbPath ** */

const args = process.argv.slice(2);
export let xlsxDirectoryPath: string = '';
let dbPath: string = '';

for (let i = 0; i < args.length; i += 2) {
  const key = args[i];
  const value = args[i + 1];
  switch (key) {
    case '--fpath':
      xlsxDirectoryPath = value;
      break;
    case '--dbpath':
      dbPath = value;
      break;
    default:
      break;
  }
}

if (!xlsxDirectoryPath) {
  xlsxDirectoryPath = process.env.XLSX_DIR_PATH || 'data';
}

if (!dbPath) {
  dbPath = process.env.DB_PATH || 'db/mydatabase.db';
}

/* **** */

export const indexHeader = 0;

export const myDatabase = new Database(dbPath, new Logger('Database'));

export const createDbQuery = `
  CREATE TABLE IF NOT EXISTS person (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT DEFAULT NULL,
    email TEXT DEFAULT NULL,
    phone TEXT DEFAULT NULL,
    mobile TEXT DEFAULT NULL,
    location TEXT DEFAULT NULL,
    raw_data TEXT DEFAULT NULL,
    file_id INTEGER,
    FOREIGN KEY (file_id) REFERENCES file(id)
  );

  CREATE TABLE IF NOT EXISTS file (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    path TEXT NOT NULL
  );
`;

export const transactionStep = 500;

export const permittedExt = ['.xlsx', '.xls', '.csv', '.ods'];
