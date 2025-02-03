
CREATE TABLE IF NOT EXISTS vendors (
    vendorId INTEGER PRIMARY KEY AUTOINCREMENT, 
    vendor TEXT, defaultRate REAL
);

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