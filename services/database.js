import { executeSql } from './dbService.js';

const migrationScript = async () => {
  console.log('Running migration script...');
  const createVendorsTable = `
    CREATE TABLE IF NOT EXISTS vendors (
        vendorId INTEGER PRIMARY KEY AUTOINCREMENT, 
        vendor TEXT, defaultRate REAL
    );
  `;

  const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions (
        transactionId INTEGER PRIMARY KEY AUTOINCREMENT, 
        vendorId INTEGER, 
        trndate DATE, 
        qty REAL, 
        rate REAL, 
        amount REAL, 
        description TEXT, 
        FOREIGN KEY (vendorId) REFERENCES vendors (vendorId)
    );  
  `;

  // Example execution (pseudo-code for database)
  await executeSql(createVendorsTable);
  await executeSql(createTransactionsTable);
};

export default migrationScript;