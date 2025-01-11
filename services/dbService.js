// import db from './database';

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('vendor_manager.db');
// const db = await SQLite.openDatabaseAsync('vendor_manager.db').catch(error => { console.error('Error opening database:', error); });

// const createTables = async () => {
//   //db.withTransactionSync(tx => {
//     // Create vendors table
    
//     await db.execAsync(
//       'CREATE TABLE IF NOT EXISTS vendors (vendorId INTEGER PRIMARY KEY AUTOINCREMENT, vendor TEXT, defaultRate REAL);'
//     );

//     // Create transactions table
//     await db.execAsync(
//       'CREATE TABLE IF NOT EXISTS transactions (transactionId INTEGER PRIMARY KEY AUTOINCREMENT, vendorId INTEGER, date TEXT, qty REAL, rate REAL, amount REAL, description TEXT, FOREIGN KEY (vendorId) REFERENCES vendors (vendorId));'
//     );
//   //});
// }

// const createTables = () => {
//   db.Transaction(tx => {
//     // Create vendors table
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS vendors (vendorId INTEGER PRIMARY KEY AUTOINCREMENT, vendor TEXT, defaultRate REAL);'
//     );

//     // Create transactions table
//     tx.executeSql(
//       'CREATE TABLE IF NOT EXISTS transactions (transactionId INTEGER PRIMARY KEY AUTOINCREMENT, vendorId INTEGER, date TEXT, qty REAL, rate REAL, amount REAL, description TEXT, FOREIGN KEY (vendorId) REFERENCES vendors (vendorId));'
//     );
//   });
// };

const executeSql = async (sql, params = []) =>{
  console.log('SQL:', sql, params);
  await db.runAsync(sql, params).catch(error => { console.error('Error executing SQL:', error); });
};

const getData = async (sql, params = []) => {
  console.log('SQL:', sql);
  var result = await db.getAllAsync(sql, params).catch(error => { console.error('Error executing SQL:', error); });
  console.log('ResultCount:', result.length);
  result.map((row) => {
    console.log('Row:', row);
  });
  return result;
};


export { executeSql, getData };
