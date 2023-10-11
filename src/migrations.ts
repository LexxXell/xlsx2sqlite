import { Logger, createDbQuery, myDatabase } from './helpers';

const logger = new Logger('Migrations');

async function main() {
  try {
    await myDatabase.query(createDbQuery);
  } catch (e) {
    logger.error(e);
  }
}

main();
