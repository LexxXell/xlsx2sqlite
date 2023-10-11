import * as sqlite3 from 'sqlite3';
import { ILogger } from '../@types';

export class Database {
  private db: sqlite3.Database;
  private logger: ILogger = console;

  constructor(private databaseName: string, logger?: ILogger) {
    if (logger) this.logger = logger;
    this.db = new sqlite3.Database(databaseName, (err) => {
      if (err) {
        this.logger.error(`Error opening database ${databaseName}: ${err.message}`);
      } else {
        this.logger.log(`Database ${databaseName} successfully opened`);
      }
    });
  }

  async query(sql: string, params: any[] = []): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  async addObjectToDb(tableName: string, object: Record<string, any>): Promise<void> {
    const keys = Object.keys(object);
    const values = Object.values(object);
    const placeholders = keys.map(() => '?').join(', ');

    const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders});`;

    try {
      await this.query(sql, values);
    } catch (err) {
      throw err;
    }
  }

  async addManyObjectToDb(tableName: string, objects: Array<Record<string, any>>): Promise<void> {
    try {
      await new Promise<void>((resolve, reject) => {
        this.db.serialize(async () => {
          this.db.run('BEGIN TRANSACTION');
          for (let object of objects) {
            const keys = Object.keys(object);
            const values = Object.values(object);
            const placeholders = keys.map(() => '?').join(', ');
            const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${placeholders});`;
            this.db.run(sql, values);
          }

          this.db.run('COMMIT', (err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      });
      this.logger.log('Transaction successfully completed');
    } catch (err) {
      this.logger.error('Error during transaction completion:', (err as Error).message);
    }
  }

  close(): void {
    this.db.close((err) => {
      if (err) {
        this.logger.error(`Error when closing database ${this.databaseName}: ${err.message}`);
      } else {
        this.logger.log(`Database ${this.databaseName} has been successfully closed`);
      }
    });
  }
}
