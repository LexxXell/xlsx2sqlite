import './helpers/init-env.helper';
import { myDatabase } from './helpers';

// Создайте подключение к базе данных SQLite
const db = myDatabase.db;

// Функция для получения списка таблиц
function getTables() {
  return new Promise<string[]>((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table';", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        const tableNames = rows.map((row: any) => row.name);
        resolve(tableNames);
      }
    });
  });
}

// Функция для получения всех записей из таблицы
function getTableData(tableName: string) {
  return new Promise<any[]>((resolve, reject) => {
    db.all(`SELECT * FROM ${tableName};`, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

// Главная функция для получения всех таблиц и их записей
async function getAllTablesAndData() {
  try {
    const tableNames = await getTables();
    for (const tableName of tableNames) {
      console.log(`Table: ${tableName}`);
      const tableData = await getTableData(tableName);
      console.log(tableData);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    db.close();
  }
}

// Вызываем главную функцию
getAllTablesAndData();
