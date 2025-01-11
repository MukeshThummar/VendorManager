import { executeSql } from './dbService';

const getReportByMonth = (month, year) => {
  return executeSql(
    'SELECT * FROM transactions WHERE strftime("%m", date) = ? AND strftime("%Y", date) = ?;',
    [month, year]
  );
};

const getReportByYear = year => {
  return executeSql(
    'SELECT * FROM transactions WHERE strftime("%Y", date) = ?;',
    [year]
  );
};

const getReportByDateRange = (startDate, endDate) => {
  return executeSql(
    'SELECT * FROM transactions WHERE date BETWEEN ? AND ?;',
    [startDate, endDate]
  );
};

export { getReportByMonth, getReportByYear, getReportByDateRange };
