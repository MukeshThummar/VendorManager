import SQLite from 'react-native-sqlite-storage';
// import RNFS from 'react-native-fs';
import { DATABASE_NAME, SQL_FILE_PATH } from '../utils/utils';

const db = SQLite.openDatabase(
  { name: DATABASE_NAME, location: 'default' },
  () => console.log('Database opened'),
  error => console.log('Error: ', error)
);

const readSQLFile = async () => {
  try {
    console.log('Reading SQL file:', SQL_FILE_PATH);
    const sqlFileContent = 'CREATE TABLE IF NOT EXISTS vendors (vendorId INTEGER PRIMARY KEY AUTOINCREMENT, vendor TEXT, defaultRate REAL);CREATE TABLE IF NOT EXISTS transactions (transactionId INTEGER PRIMARY KEY AUTOINCREMENT, vendorId INTEGER, date TEXT, qty REAL, rate REAL, amount REAL, description TEXT, FOREIGN KEY (vendorId) REFERENCES vendors (vendorId));';
    //const sqlFileContent = await RNFS.readFile(SQL_FILE_PATH, 'utf8');
    return sqlFileContent;
  } catch (error) {
    console.error('Error reading SQL file:', error);
  }
};

export const initializeDatabase = async () => {
  const sqlFileContent = await readSQLFile();
  db.transaction(tx => {
    sqlFileContent.split(';').forEach(query => {
      if (query.trim()) {
        tx.executeSql(query);
      }
    });
  });
};

export default db;