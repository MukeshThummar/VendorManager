import { executeSql, getData } from './dbService';

const addVendor = async (vendor, defaultRate) => {
  return await executeSql(
    'INSERT INTO vendors (vendor, defaultRate) VALUES (?, ?);',
    [vendor, defaultRate]
  );
};

const updateVendor = async (vendorId, vendor, defaultRate) => {
  return await executeSql(
    'UPDATE vendors SET vendor = ?, defaultRate = ? WHERE vendorId = ?;',
    [vendor, defaultRate, vendorId]
  );
};

const deleteVendor = async vendorId => {
  return await executeSql('DELETE FROM vendors WHERE vendorId = ?;', [vendorId]);
};

const getVendors = async () => {
  return await getData("SELECT * FROM vendors;").catch(error => { console.error('Error getting vendors:', error); });
};

export { addVendor, updateVendor, deleteVendor, getVendors };
