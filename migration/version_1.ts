const migrationScript : string= `
    CREATE TABLE IF NOT EXISTS vendors (
        vendorId INTEGER PRIMARY KEY AUTOINCREMENT, 
        vendor TEXT,
        defaultRate REAL
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
    INSERT INTO vendors (vendor, defaultRate) VALUES ('Milk', 68);
    INSERT INTO vendors (vendor, defaultRate) VALUES ('Flower', 10);
`;

export const scripts: string[] = migrationScript.split(';').filter(script => script.trim() !== '');

