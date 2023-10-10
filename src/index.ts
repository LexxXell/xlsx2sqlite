// import { tableToPersonsData } from './helpers';
// tableToPersonsData('data/test (2).xlsx');

import * as sqlite3 from 'sqlite3';
import { Logger } from './helpers';

const logger = new Logger('DataBase');

function createDatabase(databaseName: string) {
  const db = new sqlite3.Database(databaseName, (err) => {
    if (err) {
      logger.error(`Error during database creation: ${err.message}`);
    } else {
      logger.log(`Database ${databaseName} has been successfully created`);
    }
  });

  db.close((err) => {
    if (err) {
      logger.error(`Database closing error: ${err.message}`);
    } else {
      logger.log(`Database ${databaseName} has been successfully closed`);
    }
  });
}

createDatabase('db/mydatabase.db');
