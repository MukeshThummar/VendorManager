import { executeSql, getData } from './dbService';

const addTransaction = async (vendorId, date, qty, rate,amount, description) => {
  return await executeSql(
    'INSERT INTO transactions (vendorId, date, qty, rate, amount, description) VALUES (?, ?, ?, ?, ?, ?);',
    [vendorId, date, qty, rate, amount, description]
  );
};

const updateTransaction = async (transactionId, vendorId, date, qty, rate,amount, description) => {
  return await executeSql(
    'UPDATE transactions SET vendorId = ?, date = ?, qty = ?, rate = ?, amount = ?, description = ? WHERE transactionId = ?;',
    [vendorId, date, qty, rate, amount, description, transactionId]
  );
};

const deleteTransaction = async transactionId => {
  return await executeSql('DELETE FROM transactions WHERE transactionId = ?;', [transactionId]);
};

const getTransactions = async () => {
  return await getData('SELECT t.transactionId, v.vendor, t.date, t.qty, t.rate, t.amount, t.description FROM transactions t JOIN vendors v ON t.vendorid = v.vendorid;').catch(error => { console.error('Error getting transactions:', error); });
};

export { addTransaction, updateTransaction, deleteTransaction, getTransactions };
