import { Logger, createDbQuery, myDatabase } from './helpers';

const logger = new Logger('Migrations');

async function main() {
  try {
    await new Promise<void>((resolve, reject) => {
      myDatabase.db.exec(createDbQuery, (error) => {
        if (error) {
          reject(`Ошибка при создании таблиц: ${error.message}`);
        } else {
          resolve();
        }
      });
    });
    logger.log('Migration complited');
  } catch (e) {
    logger.error(e);
  }
  await myDatabase.close();
  logger.log('Exit');
}

main();
