import sqlite3
import pandas as pd

def setup_sqlite_connection():
    """
    Establish a connection to the SQLite database and create necessary tables if they do not exist.
    """
    conn = sqlite3.connect('patch_intelligence.db')
    cursor = conn.cursor()

    # Create tables if they do not exist
    cursor.execute('''CREATE TABLE IF NOT EXISTS vendors (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT UNIQUE)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS products (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        version TEXT,
                        vendor_id INTEGER,
                        FOREIGN KEY (vendor_id) REFERENCES vendors(id))''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS cves (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        cve_id TEXT UNIQUE,
                        description TEXT)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS cpes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        cpe TEXT UNIQUE)''')

    cursor.execute('''CREATE TABLE IF NOT EXISTS relationships (
                        product_id INTEGER,
                        cve_id INTEGER,
                        cpe_id INTEGER,
                        type TEXT,
                        FOREIGN KEY (product_id) REFERENCES products(id),
                        FOREIGN KEY (cve_id) REFERENCES cves(id),
                        FOREIGN KEY (cpe_id) REFERENCES cpes(id))''')

    conn.commit()
    return conn, cursor


def sanitize_key(key):
    """
    Sanitize the key to remove invalid characters for SQLite (spaces or special chars).
    """
    return key.replace(" ", "_").replace(":", "_").replace("/", "_").replace("\\", "_")


def insert_data_into_sqlite(cursor, correlated_data):
    """
    Insert correlated patch data into SQLite with sanitized keys.
    """
    for _, row in correlated_data.iterrows():
        # Sanitize keys
        vendor_name = row['Vendor']
        product_name = row['Product']
        product_version = row['Version']
        cve_id = row['CVE_ID']
        cpe = row['CPE']

        # Insert vendor if not already exists
        cursor.execute("INSERT OR IGNORE INTO vendors (name) VALUES (?)", (vendor_name,))
        cursor.execute("SELECT id FROM vendors WHERE name = ?", (vendor_name,))
        vendor_id = cursor.fetchone()[0]

        # Insert product if not already exists
        cursor.execute("INSERT OR IGNORE INTO products (name, version, vendor_id) VALUES (?, ?, ?)",
                       (product_name, product_version, vendor_id))
        cursor.execute("SELECT id FROM products WHERE name = ? AND version = ? AND vendor_id = ?", 
                       (product_name, product_version, vendor_id))
        product_id = cursor.fetchone()[0]

        # Insert CVE if not already exists
        cursor.execute("INSERT OR IGNORE INTO cves (cve_id, description) VALUES (?, ?)", 
                       (cve_id, f"CVE ID: {row['CVE_ID']}"))
        cursor.execute("SELECT id FROM cves WHERE cve_id = ?", (cve_id,))
        cve_id = cursor.fetchone()[0]

        # Insert CPE if not already exists
        cursor.execute("INSERT OR IGNORE INTO cpes (cpe) VALUES (?)", (cpe,))
        cursor.execute("SELECT id FROM cpes WHERE cpe = ?", (cpe,))
        cpe_id = cursor.fetchone()[0]

        # Insert relationships
        cursor.execute("INSERT INTO relationships (product_id, cve_id, cpe_id, type) VALUES (?, ?, ?, ?)",
                       (product_id, cve_id, cpe_id, 'PATCHES'))
        cursor.execute("INSERT INTO relationships (product_id, cve_id, cpe_id, type) VALUES (?, ?, ?, ?)",
                       (product_id, cve_id, cpe_id, 'RELATED_TO'))


def main():
    """
    Main function to insert data into SQLite database.
    """
    # Setup connection
    conn, cursor = setup_sqlite_connection()

    # Load correlated data from CSV
    correlated_data = pd.read_csv('correlated_data.csv')

    # Insert data into SQLite
    insert_data_into_sqlite(cursor, correlated_data)

    # Commit changes and close the connection
    conn.commit()
    conn.close()

    print("Data inserted into SQLite successfully!")


if __name__ == '__main__':
    main()